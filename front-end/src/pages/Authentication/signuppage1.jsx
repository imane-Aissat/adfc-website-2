// src/pages/SignupPageOne.jsx
import React, { useState } from "react";
import "../../style/signupPage.css";
import RoleChoiceCard from "../../components/roleChoice";
import { useNavigate } from "react-router-dom";

function SignupPageOne() {
    const [selectedRole, setSelectedRole] = useState(null);
    const navigate = useNavigate();

    const handleContinue = () => {
        if (!selectedRole) {
            alert("Veuillez choisir un rôle.");
            return;
        }
        localStorage.setItem("selectedRole", selectedRole);
        navigate("/signup2");
    };

    return (
        <div className="signup-page">
            <div id="role-choices-side">
                <div className="orange-titles">
                    <span id="bienvenue-signup">Bienvenue,</span>
                </div>
                <div id="step1-choices">
                    {["Ressources Humaines", "Chef de base", "Chef de département", "Employé"].map((role) => (
                        <RoleChoiceCard
                            key={role}
                            roleName={role}
                            onSelect={setSelectedRole}
                            selected={selectedRole === role}
                        />
                    ))}
                </div>
            </div>
            <div id="side-bar-signup">
                <img id="adfc-logo-signup" src="/images/adfc-logo.png" alt="adfc logo" />
                <div className="text-section-role-choice">
                    <span id="orange-numbering-side-bar">1.</span>
                    <span id="role-choice-incitation-text">Choisissez le rôle qui vous correspond</span>
                </div>
                <button id="continue-button-signup" onClick={handleContinue}>
                    CONTINUER
                </button>
            </div>
        </div>
    );
}

export default SignupPageOne;
