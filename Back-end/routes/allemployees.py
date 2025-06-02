from flask import Blueprint, jsonify, request
from database import get_db_connection, get_db_cursor, close_db_connection

allemployees_bp = Blueprint('employees', __name__)

@allemployees_bp.route('/api/employees', methods=['GET'])
def get_all_employees():
    page = request.args.get('page', 1, type=int)
    per_page = 10

    try:
        conn = get_db_connection()
        cur = get_db_cursor(conn)

        cur.execute('SELECT COUNT(*) FROM employee')
        total = cur.fetchone()[0]
        
      
        offset = (page - 1) * per_page
        cur.execute('''
            SELECT
                id_employee AS id,
                prenom || ' ' || nom AS name,
                fonction AS role,
                email,
                compte_status AS status,
                shift_id AS shiftId,
                id_equipe AS teamId
            FROM employee
            LIMIT %s OFFSET %s
        ''', (per_page, offset))

        columns = [desc[0] for desc in cur.description]
        rows = [dict(zip(columns, row)) for row in cur.fetchall()]
        
        response_data = {
            'employees': rows if rows else [],
            'totalPages': max(1, (total + per_page - 1) // per_page),
            'currentPage': page,
            'totalItems': total
        }
        
        return jsonify(response_data)

    except Exception as e:
        print(f"Error fetching employees: {str(e)}")
        return jsonify({
            'error': str(e),
            'employees': [],
            'totalPages': 1,
            'currentPage': 1
        }), 500

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()