# adfc-website

## ADFC Workforce Scheduling & Shift Allocation
ADFC Workforce Scheduler is a locally hosted web application designed to automate shift planning in the oil and gas industry, focusing on ADFC's 4x4 and 6x3 rotation systems. It handles workforce scheduling, room assignments, timesheet validation, and role-based access for employees, HR, and supervisors.

## Problem Statement
Manual shift scheduling across ADFC’s multiple bases leads to errors, inefficient communication, and poor visibility. This application addresses these issues by automating the scheduling process, ensuring constraints like room capacity and team composition are respected.

## Key Features
* AI-based genetic algorithm for shift planning

* Room allocation logic with capacity constraints

* Role-based access control for employees, HR, and supervisors

* Absence requests and real-time availability dashboards

* PostgreSQL database integration

* React (frontend) + Flask (backend) web app

## Methodology
Data Preparation: Room capacity, staff profiles, rotations, team structures

Algorithm: Genetic Algorithm selected for its flexibility with large constraint spaces

Chromosome Structure: 9-week schedule per employee, encoding team, shift, and room

Fitness Function: Maximizes score (soft constraints) and minimizes penalties (hard constraint violations)

## Constraints Overview
Hard Constraints

One room per employee

Leave 5 rooms always free

Max 72 total rooms

Fixed team composition (1 supervisor + 4 others)

No room or shift conflicts

Soft Constraints

Fair workload distribution

Stable team composition

## Technologies Used
Frontend: React

Backend: Flask

Database: PostgreSQL - supabase

Scheduling Algorithm: Genetic Algorithm
