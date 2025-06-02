from flask import Flask, jsonify, request
from queries import *
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_cors import CORS
app = Flask(__name__)
from flask import Blueprint, jsonify
from routes.rooms import rooms_bp
CORS(app)
from routes.employees import employees_bp
from routes.allemployees import allemployees_bp

from routes.geneticroute import genetic_bp
from genetic import run_genetic_algorithm
from multiprocessing import freeze_support
import json
import numpy as np

from routes.CDsettings_route import settings_bp


app.register_blueprint(settings_bp)
from routes.shiftsChange import shifts_demand_bp

app.register_blueprint(shifts_demand_bp)

app.register_blueprint(allemployees_bp)
app.register_blueprint(rooms_bp)
app.register_blueprint(genetic_bp)

@app.route('/api/list-employees')
def employees():
    return jsonify(get_all_employees())

@app.route('/api/employees', methods=['POST'])
def create_employee():
    try:
        data = request.get_json()
        new_id = add_employee(data)
        return jsonify({"message": "Employee added successfully", "id": new_id}), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except RuntimeError as re:
        return jsonify({"error": str(re)}), 500

@app.route('/signup', methods=['POST'])
def signup():
    try:
        nom = request.form.get('nom')
        prenom = request.form.get('prenom')
        email = request.form.get('email')
        mot_de_passe = request.form.get('mot_de_passe')
        role = request.form.get('role')

        if not all([nom, prenom, email, mot_de_passe, role]):
            return "Champs manquants.", 400

        

        type_u_id = get_type_u_id_by_role(role)
        if type_u_id is None:
            return "Rôle invalide.", 400

        hashed_password = generate_password_hash(mot_de_passe)
        utilisateur_id = insert_user(nom, prenom, email, hashed_password, type_u_id)

        return f"Utilisateur créé avec succès. ID: {utilisateur_id}", 201

    except Exception as e:
        return f"Erreur serveur: {str(e)}", 500
@app.route("/all-users", methods=["GET"])
def get_all_users():
    conn = get_db_connection()  
    cursor = conn.cursor()
    cursor.execute("""
        SELECT u.utilisateur_id, u.nom, u."prénom", u.email, u.statut_compte, t.type_utilisateur AS role_name
        FROM utilisateurs u
        JOIN type_utilisateur t ON u.type_u_id = t.type_u_id
        WHERE t.type_utilisateur != 'superAdmin'
    """)
    users = cursor.fetchall()
    result = []
    for row in users:
        result.append({
            "id": row[0],
            "nom": row[1],
            "prénom": row[2],
            "email": row[3],
            "statut_compte": row[4],
            "role": row[5]
        })
    cursor.close()
    conn.close()
    return jsonify(result)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    mot_de_passe = data.get('mot_de_passe')

    if not email or not mot_de_passe:
        return jsonify({"error": "Email et mot de passe requis."}), 400

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT utilisateur_id, mot_de_passe, statut_compte, type_u_id
                FROM utilisateurs
                WHERE email = %s
            """, (email,))
            user = cur.fetchone()

            if not user:
                return jsonify({"error": "Utilisateur non trouvé."}), 401

            utilisateur_id, hashed_password, statut, role = user

            if statut != 'Active':
                return jsonify({"error": "Votre compte n'est pas encore activé."}), 403

            if not check_password_hash(hashed_password, mot_de_passe):
                return jsonify({"error": "Mot de passe incorrect."}), 401

            return jsonify({"message": "Connexion réussie.", "utilisateur_id": utilisateur_id,"role":role}), 200

    except Exception as e:
        return jsonify({"error": f"Erreur serveur : {str(e)}"}), 500

    finally:
        conn.close()
@app.route('/pending-users', methods=['GET'])
def get_pending_users():
    try:
        users = fetch_pending_users()  # Fetch the users with 'statut_compte' as 'inactif'
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/accept-user/<int:user_id>', methods=['POST'])
def accept_user_account(user_id):
    try:
        accept_user(user_id) 
        return jsonify({"message": "User account has been activated."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/delete-user/<int:user_id>', methods=['DELETE'])
def delete_user_account(user_id):
    try:
        delete_user(user_id) 
        return jsonify({"message": "User account has been deleted."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/update-status/<int:user_id>', methods=['PUT'])
def update_status(user_id):
    try:
        data = request.get_json()
        new_status = data.get("statut_compte")


        if new_status not in ["Active", "Inactive"]:
            return jsonify({"error": "Invalid status value"}), 400

        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            UPDATE utilisateurs
            SET statut_compte = %s
            WHERE utilisateur_id = %s
        """, (new_status, user_id))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Status updated successfully"}), 200

    except Exception as e:
        print(f"Error updating status: {e}")
        return jsonify({"error": "Internal server error"}), 500
if __name__ == '__main__':
    app.run()
    freeze_support()


@app.route('/api/shift-change', methods=['POST'])
def submit_shift_change():
    try:
        # Validate required fields
        if not request.form.get('reason'):
            return jsonify({"error": "Le champ 'raison' est requis"}), 400
        
        if not request.form.get('from_date') or not request.form.get('to_date'):
            return jsonify({"error": "Les dates de début et fin sont requises"}), 400

        # Parse dates with validation
        try:
            from_date = datetime.strptime(request.form['from_date'], '%Y-%m-%d').date()
            to_date = datetime.strptime(request.form['to_date'], '%Y-%m-%d').date()
        except ValueError as e:
            return jsonify({
                "error": "Format de date invalide",
                "details": "Utilisez le format AAAA-MM-JJ (ex: 2025-06-15)"
            }), 400

        if from_date > to_date:
            return jsonify({
                "error": "Dates invalides",
                "details": "La date de fin doit être après la date de début"
            }), 400

        # File validation
        file_data = None
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                # Validate file size
                if file.content_length > 5 * 1024 * 1024:  # 5MB
                    return jsonify({
                        "error": "Fichier trop volumineux",
                        "details": "La taille maximale est de 5MB"
                    }), 400
                
                # Validate file type
                allowed_types = {
                    'application/pdf': '.pdf',
                    'image/jpeg': ['.jpg', '.jpeg'],
                    'image/png': '.png'
                }
                if file.mimetype not in allowed_types:
                    return jsonify({
                        "error": "Type de fichier non supporté",
                        "details": "Types acceptés: PDF, JPG, PNG"
                    }), 400

                file_data = file.read()

        # Get employee ID (default to 601 as per your requirement)
        employee_id = request.form.get('employee_id', 601)

        # Insert into database
        new_id = add_shift_change_request(
            change_content=request.form['reason'],
            from_date=from_date,
            to_date=to_date,
            file_data=file_data,
            employee_id=employee_id
        )

        return jsonify({
            "success": True,
            "message": "Demande enregistrée avec succès",
            "request_id": new_id
        }), 201

    except psycopg2.Error as e:
        app.logger.error(f"Database error: {str(e)}")
        return jsonify({
            "error": "Erreur de base de données",
            "details": str(e)
        }), 500
        
    except Exception as e:
        app.logger.error(f"Unexpected error: {str(e)}")
        return jsonify({
            "error": "Erreur inattendue",
            "details": str(e)
        }), 500 


# Add this to your existing app.py
@app.route('/api/absence-request', methods=['POST'])
def submit_absence_request():
    try:
        # Get form data
        absence_content = request.form.get('reason')
        fk_employee_absence = request.form.get('employee_id', 601)  # Default to 601 as per your note
        
        # Handle file upload if exists
        absence_file = None
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                absence_file = file.read()  
        

        new_id = add_absence_request(absence_content, absence_file, fk_employee_absence)
        return jsonify({"message": "Absence request submitted successfully", "id": new_id}), 201
        
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except RuntimeError as re:
        return jsonify({"error": str(re)}), 500
    
@app.route('/api/rigs', methods=['GET'])
def get_rigs():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT puit_id, code_puit, nom_puit, interval, date_debut, date_fin FROM puit")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        rigs = []
        for row in rows:
            rigs.append({
                "puit_id": row[0],
                "code_puit": row[1],
                "nom_puit": row[2],
                "interval": row[3],
                "date_debut": row[4].isoformat() if row[4] else '',
                "date_fin": row[5].isoformat() if row[5] else ''
            })
        return jsonify(rigs), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/add-rig', methods=['POST'])
def add_rig():
    data = request.get_json()
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO puit (puit_id, code_puit, nom_puit, interval, date_debut, date_fin) VALUES (%s, %s, %s, %s, %s, %s)",
            (
                int(data['id']),
                data['rig'],
                data['name'],
                int(data['interval']),
                data['dateIn'],
                data['relieveDate']
            )
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Puits ajouté avec succès."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/delete-employee/<int:id_employee>', methods=['DELETE','OPTIONS'])
def delete_employee(id_employee):
    if request.method == 'OPTIONS':
        return '', 200 
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM employee WHERE id_employee = %s", (id_employee,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Employé supprimé avec succès."}), 200
    except Exception as e:
        return jsonify({"error": f"Erreur lors de la suppression: {str(e)}"}), 500