import React from "react";
import '..//../style/signupPage.css';
import { Link } from 'react-router-dom';

function LoginPage() {
    return(
        <div>
            <div className = "signup-page">
            <div className="picture-signup-form">
                <img id= "workers-image-signup" src="/images/picture-login.jpg" alt="workers on site" />
            </div>
            <div className="signup-form-area">
                <div id="saisie-infos-signup-box">
                    <span id="saisie-infos-signup">Connectez-vous</span>
                </div>
                <form id="signup-form" action="">
                    <input type="text" className="signup-form-input-text" placeholder="Email" />
                    <input type="text" className="signup-form-input-text" placeholder="Mot de passe" />
                    
                    <Link to="/RoomsChefdeBase" id="se-connecter-button" type="submit">Se connecter</Link>
                </form>
            </div>
        </div>
        </div>
    )
}

export default LoginPage;