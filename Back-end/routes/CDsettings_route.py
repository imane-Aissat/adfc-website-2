# settings_routes.py
from flask import Blueprint, jsonify, request
from database import get_db_connection, get_db_cursor
import bcrypt

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/api/settings/chef-departement', methods=['GET', 'PUT', 'DELETE'])
def chef_departement_settings():
    # Hardcoded chef departement ID as 14
    chef_id = 14
    
    try:
        conn = get_db_connection()
        cur = get_db_cursor(conn)
        
        if request.method == 'GET':
            # Get chef de département profile
            cur.execute('''
                SELECT u.utilisateur_id, u.nom, u.prénom, u.email, u.statut_compte, t.type_utilisateur
                FROM utilisateurs u
                JOIN type_utilisateur t ON u.type_u_id = t.type_u_id
                WHERE u.utilisateur_id = %s
            ''', (chef_id,))
            
            profile = cur.fetchone()
            if not profile:
                return jsonify({'error': 'User not found'}), 404
                
            return jsonify({
                'id': profile[0],
                'lastName': profile[1],
                'firstName': profile[2],
                'email': profile[3],
                'accountStatus': profile[4],
                'userType': profile[5]
            })
            
        elif request.method == 'PUT':
            # Update profile
            data = request.get_json()
            
            # Basic validation
            if not data.get('email') or not data.get('firstName') or not data.get('lastName'):
                return jsonify({'error': 'Missing required fields'}), 400
                
                update_password = ''
            params = [data['lastName'], data['firstName'], data['email']]
            
            if data.get('newPassword'):
                if not data.get('currentPassword'):
                    return jsonify({'error': 'Current password required'}), 400
                    
                # Verify current password (plaintext comparison)
                cur.execute('SELECT mot_de_passe FROM utilisateurs WHERE utilisateur_id = %s', (chef_id,))
                result = cur.fetchone()
                
                if not result:
                    return jsonify({'error': 'User not found'}), 404
                    
                db_password = result[0]
                
                # Direct string comparison (since passwords are stored in plaintext)
                if data['currentPassword'] != db_password:
                    return jsonify({'error': 'Current password is incorrect'}), 401
                    
                # Store new password in plaintext (you should hash this in production!)
                update_password = ', mot_de_passe = %s'
                params.append(data['newPassword'])  # Store as plaintext
                
            params.append(chef_id)
            # Update profile
            cur.execute(f'''
                UPDATE utilisateurs SET
                    nom = %s,
                    prénom = %s,
                    email = %s
                    {update_password}
                WHERE utilisateur_id = %s
            ''', tuple(params))
            
            conn.commit()
            return jsonify({'message': 'Profile updated successfully'})
            
        elif request.method == 'DELETE':
            # Delete account (soft delete by setting status to 'inactive')
            cur.execute('''
                UPDATE utilisateurs 
                SET statut_compte = 'inactive' 
                WHERE utilisateur_id = %s
            ''', (chef_id,))
            conn.commit()
            return jsonify({'message': 'Account deactivated successfully'})
            
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        if cur: cur.close()
        if conn: conn.close()