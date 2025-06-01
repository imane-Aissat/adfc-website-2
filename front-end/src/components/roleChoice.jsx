import React from "react";
import '../style/roleChoice.css'


function RoleChoiceCard({ roleName, selected, onSelect }) {
    return (
        <div
            id="role-box-choice"
            className={selected ? "active-role-card" : ""}
            onClick={() => onSelect(roleName)}
        >
            <span id="role-name-style">{roleName}</span>
        </div>
    );
}

export default RoleChoiceCard;


