from flask import Blueprint, jsonify
from database import get_db_connection, get_db_cursor, close_db_connection

employees_bp = Blueprint('employees', __name__)

@employees_bp.route('/api/employees', methods=['GET'])
def get_all_employees():
    conn = get_db_connection()
    try:
        cur = get_db_cursor(conn)
        cur.execute('''
            SELECT
                e.id_employee AS id,
                e.prenom || ' ' || e.nom AS name,
                e.fonction AS role,
                'Default Dept' AS department, -- Placeholder if you don’t have a real dept table
                TO_CHAR(current_date, 'DD Mon YYYY') AS "hireDate", -- Fake static date
                'Alger' AS residence -- Placeholder location
            FROM employee e
        ''')
        columns = [desc[0] for desc in cur.description]
        rows = [dict(zip(columns, row)) for row in cur.fetchall()]
        return jsonify(rows)
    finally:
        close_db_connection(conn, cur)
