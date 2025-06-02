from flask import Blueprint, jsonify
from database import get_db_connection, get_db_cursor, close_db_connection

shifts_demand_bp = Blueprint('shifts_demand', __name__)

@shifts_demand_bp.route('/api/shift-demands', methods=['GET'])
def get_shift_demands():
    conn = get_db_connection()
    try:
        cur = get_db_cursor(conn)
        cur.execute('''
            SELECT
                sc.id_change,
                sc.change_content,
                TO_CHAR(sc.from_date, 'YYYY-MM-DD') AS from_date,
                TO_CHAR(sc.to_date, 'YYYY-MM-DD') AS to_date,
                sc."validation_CB",
                sc."validation_CD",
                e.id_employee,
                e.nom,
                e.prenom,
                e.fonction
            FROM shift_change sc
            JOIN employee e ON sc.fk_employee = e.id_employee
            WHERE sc."validation_CB" = %s AND sc."validation_CD" = %s
        ''', (False, False))

        columns = [desc[0] for desc in cur.description]
        rows = [dict(zip(columns, row)) for row in cur.fetchall()]
        return jsonify(rows)
    finally:
        close_db_connection(conn, cur)
