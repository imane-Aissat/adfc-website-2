import random
import numpy as np
import pandas as pd
from typing import List, Dict, Tuple
from collections import defaultdict
from functools import lru_cache
from multiprocessing import Pool
import time

employees_df = pd.read_csv('Employee_Equipe_Data - Sheet1.csv')
rooms_df = pd.read_csv('chambres_data (1).csv')
wells_df = pd.read_csv('puits_data - well_data (2).csv')
# Constants from problem definition
NUM_EMPLOYEES = len(employees_df)
NUM_TEAMS = 12
NUM_WELLS = 12
NUM_ROOMS = len(rooms_df)
ROOMS_TO_KEEP_EMPTY = 5
DAYS_IN_CYCLE = 63  # 9 weeks * 7 days
ON_PERIOD = 28  # 4 weeks ON
OFF_PERIOD = 28  # 4 weeks OFF

# Team composition requirements
TEAM_COMPOSITION = {
    'expert': 1,
    'operator': 3,
    'specialist': 1
}

# Precompute employee roles for faster access
EMPLOYEE_ROLES = employees_df['Fonction'].str.lower().values

class ScheduleChromosome:
    def __init__(self, chromosome=None):
        if chromosome is None:
            self.chromosome = self._initialize_chromosome()
        else:
            self.chromosome = chromosome
        self._hash = hash(tuple(self.chromosome.ravel()))
        self.fitness = None

    def __hash__(self):
        return self._hash

    def __eq__(self, other):
        return np.array_equal(self.chromosome, other.chromosome)

    def print_schedule_matrix(self):
        print("Schedule Matrix: (Team, Shift, Room) per day. 'OFF' for off days.\n")

        for emp_index in range(NUM_EMPLOYEES):
            emp_info = employees_df.iloc[emp_index]
            lastname = emp_info['Lastname']
            firstname = emp_info['Firstname']
            role = emp_info['Fonction']
            
            emp_schedule = self.chromosome[emp_index]
            is_active = np.any(emp_schedule[:, 1] == 1)
            status = "Active (S)" if is_active else "Inactive"

            print(f"Employee {emp_index + 1:02} ({lastname}, {firstname}, {role}) - {status}:")

            day_strings = []
            for day_id, day in enumerate(emp_schedule):
                team, shift, room = map(int, day)
                if shift == 1:
                    day_strings.append(f"(T{team},S,R{room})")
                else:
                    day_strings.append("OFF")

            print("  " + " ".join(day_strings))
            print()

    def _initialize_chromosome(self) -> np.ndarray:
        """Initialize with each employee getting their own unique room during work period"""
        chromo = np.zeros((NUM_EMPLOYEES, DAYS_IN_CYCLE, 3), dtype=np.int16)

        # Track assigned rooms per day to prevent duplicates
        room_assignments_per_day = [set() for _ in range(DAYS_IN_CYCLE)]

        # Group employees by role
        role_indices = {
            'expert': np.where(EMPLOYEE_ROLES == 'expert')[0],
            'operator': np.where(EMPLOYEE_ROLES == 'operator')[0],
            'specialist': np.where(EMPLOYEE_ROLES == 'specialist')[0]
        }

        # Assign employees to teams
        team_assignments = np.zeros(NUM_EMPLOYEES, dtype=np.int16)

        # Assign experts (1 per team)
        for team_id in range(1, NUM_TEAMS+1):
            if team_id-1 < len(role_indices['expert']):
                team_assignments[role_indices['expert'][team_id-1]] = team_id

        # Assign specialists (1 per team)
        for team_id in range(1, NUM_TEAMS+1):
            if team_id-1 < len(role_indices['specialist']):
                team_assignments[role_indices['specialist'][team_id-1]] = team_id

        # Assign operators (3 per team)
        op_idx = 0
        for team_id in range(1, NUM_TEAMS+1):
            ops_assigned = 0
            while ops_assigned < 3 and op_idx < len(role_indices['operator']):
                team_assignments[role_indices['operator'][op_idx]] = team_id
                op_idx += 1
                ops_assigned += 1

        # Assign schedules with unique rooms
        for emp_id in range(NUM_EMPLOYEES):
            team_id = team_assignments[emp_id]
            if team_id == 0:
                continue

            # Determine work period (first or second rotation)
            if team_id <= NUM_TEAMS//2:
                start_day = 0
            else:
                start_day = ON_PERIOD
            end_day = start_day + ON_PERIOD

            # Find available room for this employee's work period
            for room_candidate in range(1, NUM_ROOMS + 1):
                # Check if room is available for all work days
                room_available = True
                for day in range(start_day, end_day):
                    if room_candidate in room_assignments_per_day[day]:
                        room_available = False
                        break

                if room_available:
                    # Assign this room
                    chromo[emp_id, start_day:end_day, 0] = team_id
                    chromo[emp_id, start_day:end_day, 1] = 1
                    chromo[emp_id, start_day:end_day, 2] = room_candidate

                    # Mark room as used for these days
                    for day in range(start_day, end_day):
                        room_assignments_per_day[day].add(room_candidate)
                    break

        return chromo

    @lru_cache(maxsize=None)
    def calculate_fitness(self) -> float:
        """Highly optimized fitness calculation with memoization"""
        chromo_tuple = tuple(self.chromosome.ravel())
        return self._calculate_fitness_impl(chromo_tuple)

    def _calculate_fitness_impl(self, chromo_tuple: tuple) -> float:
        """Actual fitness implementation that works with the cached version"""
        chromo = np.array(chromo_tuple).reshape((NUM_EMPLOYEES, DAYS_IN_CYCLE, 3))

        # Calculate scores (soft constraints)
        score = self._calculate_scores_vectorized(chromo)

        # Calculate penalties (hard constraints)
        penalty = self._calculate_penalties_vectorized(chromo)

        # Normalize and combine
        max_penalty = NUM_EMPLOYEES * DAYS_IN_CYCLE * 2
        normalized_penalty = penalty / max_penalty if max_penalty > 0 else 0
        return score * 0.7 - normalized_penalty * 0.3

    def _calculate_scores_vectorized(self, chromo: np.ndarray) -> float:
        """Vectorized calculation of soft constraint scores"""
        # Room stability score (f1)
        on_days = chromo[:, :, 1] == 1
        rooms = chromo[:, :, 2]

        # For each employee, find their most common room during ON days
        room_stability = 0
        for emp_id in range(NUM_EMPLOYEES):
            emp_rooms = rooms[emp_id, on_days[emp_id]]
            if len(emp_rooms) == 0:
                continue
            unique, counts = np.unique(emp_rooms, return_counts=True)
            most_common_room = unique[np.argmax(counts)]
            same_room = np.sum(emp_rooms == most_common_room)
            room_stability += same_room / len(emp_rooms)
        f1 = room_stability / NUM_EMPLOYEES

        # Well coverage score (f2)
        active_teams_per_day = np.zeros(DAYS_IN_CYCLE)
        for day in range(DAYS_IN_CYCLE):
            active_teams = np.unique(chromo[on_days[:, day], day, 0])
            active_teams_per_day[day] = len(active_teams)
        coverage_score = np.sum(1 - np.abs(NUM_WELLS - active_teams_per_day) / NUM_WELLS)
        f2 = coverage_score / DAYS_IN_CYCLE

        # Team stability score (f3)
        team_stability = 0
        for emp_id in range(NUM_EMPLOYEES):
            emp_teams = chromo[emp_id, on_days[emp_id], 0]
            if len(emp_teams) == 0:
                continue
            unique, counts = np.unique(emp_teams, return_counts=True)
            primary_team = unique[np.argmax(counts)]
            same_team = np.sum(emp_teams == primary_team)
            team_stability += same_team / len(emp_teams)
        f3 = team_stability / NUM_EMPLOYEES

        return 0.3 * f1 + 0.4 * f2 + 0.3 * f3

    def _calculate_penalties_vectorized(self, chromo: np.ndarray) -> float:
        """Vectorized calculation of penalties"""
        penalty = 0

        # Track room usage per day
        room_usage = defaultdict(lambda: defaultdict(int))

        for day in range(DAYS_IN_CYCLE):
            active = chromo[:, day, 1] == 1
            rooms = chromo[active, day, 2]
            emp_ids = np.where(active)[0]

            for room, emp_id in zip(rooms, emp_ids):
                room_usage[day][room] += 1

                # Heavy penalty if room is shared
                if room_usage[day][room] > 1:
                    penalty += 1000  # Extremely heavy penalty

        # 1. ON/OFF transition penalty (vectorized)
        transitions = np.sum(np.abs(np.diff(chromo[:, :, 1], axis=1)) > 0, axis=1)
        penalty += np.sum(np.maximum(transitions - 1, 0)) * 10

        # 2. Missing room assignment penalty (vectorized)
        missing_room = np.sum((chromo[:, :, 1] == 1) & (chromo[:, :, 2] == 0))
        penalty += missing_room * 5

        # 3. Team composition penalty (partially vectorized)
        for day in range(DAYS_IN_CYCLE):
            active = chromo[:, day, 1] == 1
            if not np.any(active):
                continue

            team_ids = chromo[active, day, 0]
            roles = EMPLOYEE_ROLES[active]

            for team_id in np.unique(team_ids):
                team_mask = team_ids == team_id
                team_roles = roles[team_mask]

                for role, required in TEAM_COMPOSITION.items():
                    count = np.sum(team_roles == role)
                    penalty += abs(count - required) * 20

        return penalty

    def crossover(self, other: 'ScheduleChromosome') -> Tuple['ScheduleChromosome', 'ScheduleChromosome']:
        """Optimized crossover with block operations"""
        # Create children by copying parent data
        child1 = self.chromosome.copy()
        child2 = other.chromosome.copy()

        # Perform crossover on multiple employees at once
        for _ in range(3):  # Crossover 3 employees to increase diversity
            emp_id = random.randint(0, NUM_EMPLOYEES - 1)

            # Find ON periods
            parent1_on = np.where(self.chromosome[emp_id, :, 1] == 1)[0]
            parent2_on = np.where(other.chromosome[emp_id, :, 1] == 1)[0]

            if len(parent1_on) == 0 or len(parent2_on) == 0:
                continue

            start1, end1 = parent1_on[0], parent1_on[-1]
            start2, end2 = parent2_on[0], parent2_on[-1]

            # Swap ON periods
            child1[emp_id, start2:end2+1] = other.chromosome[emp_id, start2:end2+1]
            child2[emp_id, start1:end1+1] = self.chromosome[emp_id, start1:end1+1]

        return ScheduleChromosome(child1), ScheduleChromosome(child2)

    def mutate(self) -> 'ScheduleChromosome':
        """Mutation that enforces unique room assignments"""
        mutated = self.chromosome.copy()
        emp_id = random.randint(0, NUM_EMPLOYEES - 1)

        # Get current work period
        on_days = np.where(mutated[emp_id, :, 1] == 1)[0]
        if len(on_days) == 0:
            return ScheduleChromosome(mutated)

        current_start, current_end = on_days[0], on_days[-1]
        team_id = mutated[emp_id, current_start, 0]

        if random.random() < 0.5:
            # Shift work period
            shift = random.randint(-7, 7)
            new_start = max(0, min(DAYS_IN_CYCLE - ON_PERIOD, current_start + shift))
            new_end = new_start + ON_PERIOD

            # Find available room for new period
            available_rooms = set(range(1, NUM_ROOMS + 1))
            for day in range(new_start, new_end):
                active = mutated[:, day, 1] == 1
                used_rooms = set(mutated[active, day, 2])
                available_rooms -= used_rooms

            if available_rooms:
                new_room = random.choice(list(available_rooms))
                # Clear current and set new
                mutated[emp_id, current_start:current_end+1] = 0
                mutated[emp_id, new_start:new_end, 0] = team_id
                mutated[emp_id, new_start:new_end, 1] = 1
                mutated[emp_id, new_start:new_end, 2] = new_room
        else:
            # Change room (must be unique for work period)
            available_rooms = set(range(1, NUM_ROOMS + 1))
            for day in range(current_start, current_end):
                active = (mutated[:, day, 1] == 1) & (np.arange(NUM_EMPLOYEES) != emp_id)
                used_rooms = set(mutated[active, day, 2])
                available_rooms -= used_rooms

            if available_rooms:
                new_room = random.choice(list(available_rooms))
                mutated[emp_id, current_start:current_end, 2] = new_room

        return ScheduleChromosome(mutated)

def evaluate_individual(individual):
    """Helper function for parallel evaluation"""
    return individual.calculate_fitness()

# Genetic Algorithm Parameters
POPULATION_SIZE = 50
GENERATIONS = 200
ELITISM = 5
STAGNATION_LIMIT = 20  # Stop if no improvement for this many generations

def run_genetic_algorithm():
    # Create initial population
    print("Initializing population...")
    population = [ScheduleChromosome() for _ in range(POPULATION_SIZE)]

    # Track best fitness history for stagnation detection
    best_fitness_history = []
    start_time = time.time()

    # Use multiprocessing pool for parallel evaluation
    with Pool() as pool:
        for generation in range(GENERATIONS):
            # Parallel fitness evaluation
            fitness_values = pool.map(evaluate_individual, population)
            for ind, fit in zip(population, fitness_values):
                ind.fitness = fit

            # Sort by fitness
            population.sort(key=lambda x: x.fitness, reverse=True)
            best_fitness = population[0].fitness
            best_fitness_history.append(best_fitness)

            # Check for stagnation
            if len(best_fitness_history) > STAGNATION_LIMIT:
                recent_improvement = max(best_fitness_history[-STAGNATION_LIMIT:]) - min(best_fitness_history[-STAGNATION_LIMIT:])
                if recent_improvement < 0.01:  # Less than 1% improvement
                    print(f"Early termination at generation {generation} due to stagnation")
                    break

            # Print progress
            if generation % 10 == 0:
                elapsed = time.time() - start_time
                print(f"Gen {generation}: Best Fit = {best_fitness:.4f} | Time = {elapsed:.2f}s")

            # Elitism: keep top individuals
            new_population = population[:ELITISM]

            # Create offspring through tournament selection
            while len(new_population) < POPULATION_SIZE:
                # Tournament selection
                tournament = random.sample(population, 3)
                parent1 = max(tournament, key=lambda x: x.fitness)
                tournament = random.sample(population, 3)
                parent2 = max(tournament, key=lambda x: x.fitness)

                # Crossover
                child1, child2 = parent1.crossover(parent2)
                new_population.extend([child1, child2])

            # Mutation
            for i in range(ELITISM, len(new_population)):
                if random.random() < 0.3:
                    new_population[i] = new_population[i].mutate()

            population = new_population[:POPULATION_SIZE]

    # Final results
    best_solution = max(population, key=lambda x: x.fitness)
    elapsed_time = time.time() - start_time
    print(f"\nOptimization completed in {elapsed_time:.2f} seconds")
    print(f"Final Best Fitness: {best_solution.fitness:.4f}")
    print("Best Solution Schedule:")
    best_solution.print_schedule_matrix()

    return best_solution

def convert_to_frontend_format(chromosome, employees_df):
    """Convert the chromosome to frontend-friendly format with employee details"""
    employee_data = []
    
    for emp_id in range(chromosome.shape[0]):
        try:
            emp_info = employees_df.iloc[emp_id]
            lastname = emp_info['Lastname']
            firstname = emp_info['Firstname']
            role = emp_info['Fonction']
            
            employee = {
                "id": emp_id + 1,  # 1-based index for frontend
                "lastname": lastname,
                "firstname": firstname,
                "role": role,
                "team": "",
                "shifts": []
            }
            
            # Determine team (most common team assignment)
            team_assignments = chromosome[emp_id, :, 0]
            if np.any(team_assignments > 0):
                teams, counts = np.unique(team_assignments[team_assignments > 0], return_counts=True)
                primary_team = teams[np.argmax(counts)]
                employee["team"] = f"Équipe {primary_team}"
            else:
                employee["team"] = "Non assigné"
            
            # Convert shifts for all days
            for day in range(DAYS_IN_CYCLE):
                team, shift, room = map(int, chromosome[emp_id, day])
                
                shift_data = {
                    "date": day + 1,  # 1-based index for frontend
                    "room": int(room) if room > 0 else 0
                }
                
                if shift == 1:  # Working day
                    shift_data["status"] = "normal"
                elif team == 0 and shift == 0 and room == 0:  # Off day
                    shift_data["status"] = "leave"
                else:  # Other cases
                    shift_data["status"] = "absent"
                
                employee["shifts"].append(shift_data)
            
            employee_data.append(employee)
            
        except Exception as e:
            print(f"[ERROR] Processing employee {emp_id}: {str(e)}")
            # Add a default employee entry to maintain consistency
            employee_data.append({
                "id": emp_id + 1,
                "lastname": f"Unknown",
                "firstname": f"Employee {emp_id + 1}",
                "role": "Unknown",
                "team": "Non assigné",
                "shifts": [{"date": d + 1, "status": "absent", "room": 0} for d in range(DAYS_IN_CYCLE)]
            })
    
    return {
        "success": True,
        "schedule": {
            "employees": employee_data,
            "metadata": {
                "total_employees": len(employee_data),
                "total_days": DAYS_IN_CYCLE,
                "generation_date": datetime.now().isoformat()
            }
        }
    }