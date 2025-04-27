import React from "react";
import '..//../style/signupPage.css';
import { Link } from 'react-router-dom';

function SignupPageTwo() {
    return(
        <div className = "signup-page">
            <div className="picture-signup-form">
                <img id= "workers-image-signup" src="/images/picture-signup1.jpg" alt="workers on site" />
            </div>
            <div className="signup-form-area">
                <div id="saisie-infos-signup-box">
                    <span id="saisie-infos-signup">2. Saisissez vos informations</span>
                </div>
                <form id="signup-form" action="">
                    <input type="text" className="signup-form-input-text" placeholder="Nom" />
                    <input type="text" className="signup-form-input-text" placeholder="Prénom" />
                    <input type="text" className="signup-form-input-text" placeholder="Email" />
                    <input type="text" className="signup-form-input-text" placeholder="Mot de passe" />
                    <input type="text" className="signup-form-input-text" placeholder="Confirmer le mot de passe" />
                    <span>Je possède déjà un compte <Link to="/login" id="se-connecter-signup">Se connecter</Link></span>
                    <button id="create-account-button" type="submit">Créer</button>
                </form>
            </div>
        </div>
    )
}

export default SignupPageTwo;