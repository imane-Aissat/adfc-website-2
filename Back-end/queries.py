import psycopg2
from database import get_db_connection, get_db_cursor, close_db_connection

def get_all_employees1():
    """Fetch all employees (excluding sensitive fields)"""
    conn = get_db_connection()
    try:
        cur = get_db_cursor(conn)
        cur.execute("""
            SELECT id_employee, nom, prenom, email, 
                   compte_status, fonction, id_equipe
            FROM employee
        """)
        columns = [desc[0] for desc in cur.description]
        return [dict(zip(columns, row)) for row in cur.fetchall()]
    finally:
        close_db_connection(conn, cur)

def add_employee(employee_data):
    """
    Safely inserts a new employee into the database
    Args:
        employee_data (dict): Dictionary containing employee fields
    Returns:
        int: The ID of the newly created employee
    Raises:
        ValueError: For invalid data or constraint violations
        RuntimeError: For database operation failures
    """
    conn = get_db_connection()
    try:
        cur = get_db_cursor(conn)


        required_fields = ['nom', 'prenom', 'email', 'mot_de_passe', 'fonction']
        for field in required_fields:
            if not employee_data.get(field):
                raise ValueError(f"Missing required field: {field}")

        insert_data = {
            'nom': str(employee_data['nom']),
            'prenom': str(employee_data['prenom']),
            'email': str(employee_data['email']),
            'mot_de_passe': str(employee_data['mot_de_passe']),
            'compte_status': str(employee_data.get('compte_status', 'active')),
            'fonction': str(employee_data['fonction']),
            'shift_id': int(employee_data['shift_id']) if employee_data.get('shift_id') else None,
            'id_equipe': int(employee_data['id_equipe']) if employee_data.get('id_equipe') else None
        }


        cur.execute("""
            INSERT INTO employee (
                nom, prenom, email, mot_de_passe,
                compte_status, fonction, shift_id, id_equipe
            ) VALUES (
                %(nom)s, %(prenom)s, %(email)s,
                %(mot_de_passe)s, %(compte_status)s,
                %(fonction)s, %(shift_id)s, %(id_equipe)s
            ) RETURNING id_employee
        """, insert_data)

        conn.commit()
        return cur.fetchone()[0]

    except psycopg2.IntegrityError as e:
        if "unique constraint" in str(e):
            raise ValueError("Email address already exists")
        elif "foreign key" in str(e):
            raise ValueError("Invalid shift_id or id_equipe reference")
        raise ValueError(f"Database constraint violation: {str(e)}")

    except (TypeError, ValueError) as e:
        raise ValueError(f"Invalid data format: {str(e)}")

    except Exception as e:
        raise RuntimeError(f"Database operation failed: {str(e)}")

    finally:
        close_db_connection(conn, cur)

def insert_user(nom, prenom, email, mot_de_passe, type_u_id, statut_compte='Inactive'):
    max_lengths = {
        'nom': 100,  
        'prenom': 100,  
        'email': 100,  
        'mot_de_passe': 255,  
        'statut_compte': 50  
    }


    nom = nom.strip()[:max_lengths['nom']]
    prenom = prenom.strip()[:max_lengths['prenom']]
    email = email.strip()[:max_lengths['email']]
    mot_de_passe = mot_de_passe.strip()[:max_lengths['mot_de_passe']]
    statut_compte = statut_compte.strip()[:max_lengths['statut_compte']]


    if len(nom) > max_lengths['nom']:
        raise ValueError(f"Nom exceeds the maximum length of {max_lengths['nom']} characters.")
    if len(prenom) > max_lengths['prenom']:
        raise ValueError(f"Prenom exceeds the maximum length of {max_lengths['prenom']} characters.")
    if len(email) > max_lengths['email']:
        raise ValueError(f"Email exceeds the maximum length of {max_lengths['email']} characters.")
    if len(mot_de_passe) > max_lengths['mot_de_passe']:
        raise ValueError(f"Mot_de_passe exceeds the maximum length of {max_lengths['mot_de_passe']} characters.")
    if len(statut_compte) > max_lengths['statut_compte']:
        raise ValueError(f"Statut_compte exceeds the maximum length of {max_lengths['statut_compte']} characters.")

    conn = get_db_connection()
    try:
        cur = get_db_cursor(conn)
        cur.execute(''' 
            INSERT INTO utilisateurs (nom, "prénom", email, mot_de_passe, type_u_id, statut_compte)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING utilisateur_id
        ''', (nom, prenom, email, mot_de_passe, type_u_id, statut_compte))
        
        utilisateur_id = cur.fetchone()[0]
        conn.commit()

        return utilisateur_id

    except Exception as e:
        conn.rollback()  
        raise RuntimeError(f"Database insertion failed: {str(e)}")
    
    finally:
        close_db_connection(conn, cur)

def get_user_by_id(utilisateur_id):
    conn = get_db_connection()
    try:
        cur = get_db_cursor(conn)
        cur.execute('''
            SELECT utilisateur_id, nom, "prénom", email, statut_compte, type_u_id
            FROM utilisateurs
            WHERE utilisateur_id = %s
        ''', (utilisateur_id,))
        user = cur.fetchone()
        if user:
            return {
                "utilisateur_id": user[0],
                "nom": user[1],
                "prenom": user[2],
                "email": user[3],
                "statut_compte": user[4],
                "type_u_id": user[5]
            }
        else:
            return None
    finally:
        close_db_connection(conn, cur)


def get_type_u_id_by_role(role):
    from database import get_db_connection
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT type_u_id FROM type_utilisateur WHERE type_utilisateur = %s", (role,))
            result = cur.fetchone()
            return result[0] if result else None
    finally:
        conn.close()

def get_user_by_email(email):
    from database import get_db_connection
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('''
                SELECT utilisateur_id, nom, "prénom", email, mot_de_passe, statut_compte, type_u_id
                FROM utilisateurs
                WHERE email = %s
            ''', (email,))
            user = cur.fetchone()
            if user:
                return {
                    "utilisateur_id": user[0],
                    "nom": user[1],
                    "prenom": user[2],
                    "email": user[3],
                    "mot_de_passe": user[4],
                    "statut_compte": user[5],
                    "type_u_id": user[6]
                }
            return None
    finally:
        conn.close()
def fetch_pending_users():
    from database import get_db_connection
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('''
                SELECT utilisateur_id, nom, "prénom", email, statut_compte, type_u_id
                FROM utilisateurs
                WHERE statut_compte = 'Inactive'
            ''')
            users = cur.fetchall()
            result = []
            for user in users:
                role_name = get_role_name_by_id(user[5])  # Get role name by type_u_id
                result.append({
                    "utilisateur_id": user[0],
                    "nom": user[1],
                    "prenom": user[2],
                    "email": user[3],
                    "statut_compte": user[4],
                    "role_name": role_name
                })
            return result
    finally:
        conn.close()

def get_role_name_by_id(type_u_id):
    from database import get_db_connection
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('''
                SELECT type_utilisateur FROM type_utilisateur WHERE type_u_id = %s
            ''', (type_u_id,))
            result = cur.fetchone()
            return result[0] if result else None
    finally:
        conn.close()

def accept_user(user_id):
    from database import get_db_connection
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('''
                UPDATE utilisateurs
                SET statut_compte = 'actif'
                WHERE utilisateur_id = %s
            ''', (user_id,))
            conn.commit()
    finally:
        conn.close()

def delete_user(user_id):
    from database import get_db_connection
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('''
                DELETE FROM utilisateurs WHERE utilisateur_id = %s
            ''', (user_id,))
            conn.commit()
    finally:
        conn.close()

def add_shift_change_request(change_content, from_date, to_date, file_data, employee_id):
    """Add a new shift change request to the database"""
    conn = get_db_connection()
    try:
        cur = get_db_cursor(conn)
        cur.execute("""
            INSERT INTO public.shift_change 
            (change_content, from_date, to_date, "File", fk_employee)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id_change
        """, (change_content, from_date, to_date, file_data, employee_id))
        
        new_id = cur.fetchone()[0]
        conn.commit()
        return new_id
    except psycopg2.Error as e:
        conn.rollback()
        raise RuntimeError(f"Database error: {e}")
    finally:
        close_db_connection(conn, cur)


def add_absence_request(absence_content, absence_file, fk_employee_absence):
    """Add a new absence request to the database"""
    conn = get_db_connection()
    try:
        cur = get_db_cursor(conn)
        cur.execute("""
            INSERT INTO public.absence_form 
            (absence_content, absence_file, fk_employee_absence)
            VALUES (%s, %s, %s)
            RETURNING id_absence
        """, (absence_content, absence_file, fk_employee_absence))
        
        new_id = cur.fetchone()[0]
        conn.commit()
        return new_id
    except psycopg2.Error as e:
        conn.rollback()
        raise RuntimeError(f"Database error: {e}")
    finally:
        close_db_connection(conn, cur)
