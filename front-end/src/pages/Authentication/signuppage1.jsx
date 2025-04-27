import React from "react";
import '../../style/signupPage.css';
import RoleChoiceCard from "../../components/roleChoice";
import { Link } from 'react-router-dom';

function SignupPageOne() {
    return (
        <div className = "signup-page">
            <div id= "role-choices-side">
                <div className = "orange-titles">
                    <span id="bienvenue-signup">Bienvenue,</span>
                </div>
                <div id = "step1-choices">
                <RoleChoiceCard roleName="Ressources Humaines"/>
                <RoleChoiceCard roleName="Employé"/>
                <RoleChoiceCard roleName="Chef de base"/>
                <RoleChoiceCard roleName="Chef de département"/>
                </div>
            </div>
            <div id="side-bar-signup">
                <div>
                    <img id="adfc-logo-signup" src="/images/adfc-logo.png" alt="adfc logo" />
                </div>
                <div className="text-section-role-choice">
                    <span id="orange-numbering-side-bar">1.</span>
                    <span id="role-choice-incitation-text">Choisissez le rôle qui vous correspond</span>
                </div>
                <div className="white-button-signup">
                    <button id="continue-button-signup">
                        <Link to='/signup2' id="continue-button-signup-text">CONTINUER</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignupPageOne;