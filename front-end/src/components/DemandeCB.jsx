import React from "react";
import '../style/DemandeCB.css'

function DemandeChefDeBase({picture, employeeName, employeeRole, demandContent}) {
    return <div id="demande-container-shift-CB">
        <div id="demande-shift-CB">
            <div id="employee-information-row">
                <div id="employee-information-row-picture-container">
                    <img id="employee-information-row-picture" src={picture} alt="employee" />
                </div>
                <div id="employee-information-name-role-container">
                    <div id="employee-information-name">{employeeName}</div>
                    <div id="employee-information-role">{employeeRole}</div>
                </div>
            </div>
            <div id="employee-demand-content-container">
                <span id="employee-demand-content">{demandContent}</span>
            </div>
            <div id="accept-reject-buttons-container">
                <button className="demand-buttons" id="demand-buttons-accept">Accepter</button>
                <button className="demand-buttons" id="demand-buttons-reject">Rejeter</button>
            </div>
        </div>
    </div>
}

export default DemandeChefDeBase;