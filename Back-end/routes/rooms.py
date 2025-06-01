from flask import Blueprint, jsonify
from database import get_db_connection, get_db_cursor, close_db_connection

rooms_bp = Blueprint('rooms', __name__)

@rooms_bp.route('/api/rooms', methods=['GET'])
def get_all_rooms():
    conn = get_db_connection()
    try:
        cur = get_db_cursor(conn)
        cur.execute('''
            SELECT
                c.id_chambre AS id,
                c.numero_chambre AS "Chambres",
                c.status_chambre AS "Status",
                COALESCE(
                    json_agg(json_build_object(
                        'name', e.prenom
                    )),
                    '[]'
                ) AS "Résidents"
            FROM chambre c
            LEFT JOIN chambre_employé ce ON c.id_chambre = ce.id_chambre
            LEFT JOIN employee e ON ce.id_employe = e.id_employee
            GROUP BY c.id_chambre, c.numero_chambre, c.status_chambre
            ORDER BY c.numero_chambre
        ''')
        columns = [desc[0] for desc in cur.description]
        rows = [dict(zip(columns, row)) for row in cur.fetchall()]
        print(jsonify(rows))
        return jsonify(rows)
    finally:
        close_db_connection(conn, cur)
