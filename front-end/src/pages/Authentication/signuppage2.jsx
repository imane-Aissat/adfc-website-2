// pages/SignupPageTwo.js
// pages/SignupPageTwo.js
import React, { useEffect, useState } from "react";
import '../../style/signupPage.css';
import { Link } from 'react-router-dom';

function SignupPageTwo() {
    const [role, setRole] = useState("");

    useEffect(() => {
        const selectedRole = localStorage.getItem("selectedRole");
        if (!selectedRole) {
            alert("Aucun rôle sélectionné. Veuillez recommencer.");
            window.location.href = "/signup1"; // Redirect if role missing
        } else {
            setRole(selectedRole);
        }
    }, []);
const handleSubmit = async (e) => {
  e.preventDefault();

  // Collect form data
  const form = e.target;
  const formData = new FormData(form);
  const dataToSend = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      // Clear localStorage
      localStorage.removeItem("selectedRole");

      // Redirect to login
      window.location.href = "/login";
    } else {
      const error = await response.json();
      alert("Signup failed: " + (error.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("Something went wrong during signup.");
  }
};

    return (
        <div className="signup-page">
            <div className="picture-signup-form">
                <img id="workers-image-signup" src="/images/picture-signup1.jpg" alt="workers on site" />
            </div>
            <div className="signup-form-area">
                <div id="saisie-infos-signup-box">
                    <span id="saisie-infos-signup">2. Saisissez vos informations</span>
                </div>
                <form
                    id="signup-form"
                    method="POST"
                    action="http://localhost:5000/signup"
                    onSubmit={() => localStorage.removeItem("selectedRole")} // clear localStorage after submission
                >
                    <input type="text" name="nom" className="signup-form-input-text" placeholder="Nom" required />
                    <input type="text" name="prenom" className="signup-form-input-text" placeholder="Prénom" required />
                    <input type="email" name="email" className="signup-form-input-text" placeholder="Email" required />
                    <input type="password" name="mot_de_passe" className="signup-form-input-text" placeholder="Mot de passe" required />
                    <input type="password" name="confirmer_mot_de_passe" className="signup-form-input-text" placeholder="Confirmer le mot de passe" required />

                    <input type="hidden" name="role" value={role} />

                    <span>Je possède déjà un compte <Link to="/login" id="se-connecter-signup">Se connecter</Link></span>
                    <button id="create-account-button" type="submit">Créer</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPageTwo;
