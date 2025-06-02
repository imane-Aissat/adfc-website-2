from flask import Blueprint, jsonify, request
from genetic import run_genetic_algorithm, convert_to_frontend_format, employees_df, DAYS_IN_CYCLE
from collections import defaultdict
import numpy as np

genetic_bp = Blueprint('genetic', __name__, url_prefix='/api')
def convert_schedule_to_json(schedule_chromosome):
    """Convert the schedule chromosome to a JSON-serializable format"""
    schedule = schedule_chromosome.chromosome
    employees = []
    
    for emp_index in range(schedule.shape[0]):
        try:
            emp_info = employees_df.iloc[emp_index]
            
            team_ids = schedule[emp_index, :, 0]
            unique_teams = np.unique(team_ids[team_ids > 0])
            team_id = int(unique_teams[0]) if len(unique_teams) > 0 else 0
            
            employee_data = {
                'name': f"{emp_info['Firstname']} {emp_info['Lastname']}",  
                'role': emp_info['Fonction'],
                'team': f"Équipe {team_id}" if team_id > 0 else "Non assigné",
                'shifts': []
            }
            

            for day in range(DAYS_IN_CYCLE):
                team, shift, room = map(int, schedule[emp_index, day])
                
                shift_data = {
                    'date': day + 1,  
                    'room': int(room) if room > 0 else 0
                }
                
                if shift == 1:  
                    shift_data['status'] = 'normal'
                elif team == 0 and shift == 0 and room == 0:  
                    shift_data['status'] = 'leave'
                else:
                    shift_data['status'] = 'absent'
                
                employee_data['shifts'].append(shift_data)
            
            employees.append(employee_data)
            
        except Exception as e:
            print(f"[ERROR] Processing employee {emp_index}: {str(e)}")
            # Add default entry if error occurs
            employees.append({
                'name': f"Employee {emp_index + 1}",
                'role': "Unknown",
                'team': "Non assigné",
                'shifts': [{
                    'date': d + 1,
                    'status': 'absent',
                    'room': 0
                } for d in range(DAYS_IN_CYCLE)]
            })
    
    return {
        'employees': employees,
        'days_in_cycle': DAYS_IN_CYCLE
    }
@genetic_bp.route('/run-algo', methods=['POST'])
def run_algo_route():
    try:
        print("[DEBUG] Running genetic algorithm...")
        result = run_genetic_algorithm()
        
        if result is None:
            raise ValueError("Genetic algorithm returned None")
        
        print("[DEBUG] Converting result to JSON...")
        schedule_json = convert_schedule_to_json(result)
        
        print("[DEBUG] Returning response.")
        return jsonify({
            'success': True,
            'schedule': schedule_json
        })
    except Exception as e:
        print(f"[ERROR] {str(e)}", flush=True)
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@genetic_bp.route('/genetic', methods=['POST'])
def genetic_api():
    try:
        print("[DEBUG] Running genetic algorithm via /genetic endpoint...")
        best_schedule = run_genetic_algorithm()
        
        if best_schedule is None:
            raise ValueError("Genetic algorithm returned None")
        
        print("[DEBUG] Converting to frontend format...")
        frontend_data = convert_schedule_to_json(best_schedule)
        
        print("[DEBUG] Returning genetic API response.")
        return jsonify({
            "success": True,
            "schedule": frontend_data
        })
    except Exception as e:
        print(f"[ERROR] in genetic_api: {str(e)}", flush=True)
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500