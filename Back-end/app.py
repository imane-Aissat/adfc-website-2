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
from routes.geneticroute import genetic_bp

from genetic import run_genetic_algorithm
from multiprocessing import freeze_support

import json
import numpy as np
app.register_blueprint(employees_bp)
app.register_blueprint(rooms_bp)
app.register_blueprint(genetic_bp)

@app.route('/api/employees')
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