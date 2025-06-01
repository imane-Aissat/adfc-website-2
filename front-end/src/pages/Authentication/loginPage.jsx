import React, { useState } from "react";
import '../../style/signupPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, mot_de_passe: motDePasse })
        });

        const data = await response.json();

        if (response.ok) {
            const { utilisateur_id, role } = data;

            // Map integer role ID to role name
            const roleMapping = {
                0: "Admin",
                1: "Resources Humaines",
                3: "Chef de base",
                2: "Employé", 
                4: "Chef d'epartement"
                // Add more roles if necessary
            };

            const roleName = roleMapping[role] || "Unknown";  // Default to 'Unknown' if no match

            console.log("User ID:", utilisateur_id);
            console.log("Role:", roleName);

            // Now use the roleName for routing
            if (roleName === "Admin") {
                navigate("/admin_dashboard");
            } else if (roleName === "Chef de base") {
                navigate("/RoomsChefdeBase");
            } else if (roleName === "Resources Humaines") {
                navigate("/hr-dashboard");
            } else if (roleName === "Employé") {
                navigate("/employee");
            } else {
                navigate("/"); // default for other roles
            }
        } else {
            setError(data.error || "Erreur lors de la connexion.");
        }
    } catch (err) {
        setError("Erreur serveur. Veuillez réessayer plus tard.");
    }
};


    return (
        <div className="signup-page">
            <div className="picture-signup-form">
                <img id="workers-image-signup" src="/images/picture-login.jpg" alt="workers on site" />
            </div>
            <div className="signup-form-area">
                <div id="saisie-infos-signup-box">
                    <span id="saisie-infos-signup">Connectez-vous</span>
                </div>
                <form id="signup-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="signup-form-input-text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="signup-form-input-text"
                        placeholder="Mot de passe"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button id="se-connecter-button" type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
