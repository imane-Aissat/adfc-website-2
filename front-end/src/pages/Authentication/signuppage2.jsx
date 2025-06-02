// pages/SignupPageTwo.js
// pages/SignupPageTwo.js
import React, { useEffect, useState } from "react";
import '../../style/signupPage.css';


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

  const form = e.target;
  const formData = new FormData(form);
  const dataToSend = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // MUST be set
      },
      body: JSON.stringify(dataToSend),      // Must send JSON string
    });

    if (response.ok) {
      window.location.href = "/login";
    } else {
      const error = await response.json();
      alert("Signup failed: " + (error.error || "Unknown error"));
    }
  } catch (err) {
    alert("Something went wrong during signup.");
    console.error(err);
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

                    
                    <button id="create-account-button" type="submit">Créer</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPageTwo;
