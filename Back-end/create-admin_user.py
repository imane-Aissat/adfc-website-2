from werkzeug.security import generate_password_hash
from queries import insert_user, get_type_u_id_by_role
from database import get_db_connection

def admin_user_exists(email):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('SELECT 1 FROM utilisateurs WHERE email = %s', (email,))
            return cur.fetchone() is not None
    finally:
        conn.close()

def create_admin_user():
    email = "superAdmin@adfc-holding-sonatrach.dz"
    if admin_user_exists(email):
        print("Admin user already exists. No action taken.")
        return

   

    hashed_password = generate_password_hash("ADFC_superAdmin")

    utilisateur_id = insert_user(
        nom="admin",
        prenom="admin",
        email=email,
        mot_de_passe=hashed_password,
        type_u_id=0,
        statut_compte="actif"
    )

    print(f"Admin user created successfully with ID: {utilisateur_id}")

if __name__ == "__main__":
    create_admin_user()
