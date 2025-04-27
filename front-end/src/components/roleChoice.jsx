import React from "react";
import '../style/roleChoice.css'

function RoleChoiceCard({roleName}) {
    return (
        <div id="role-box-choice">
            <span id="role-name-style">{roleName}</span>
        </div>
    )
}

export default RoleChoiceCard;