import React from "react";
import "../../style/employee/RequestCard.css";

const RequestCard = ({ status, onDetailsClick }) => {
  return (
    <div className="salah-request-card">
      <p className="salah-status-label">Statut de la demande :</p>
      <span className={`salah-status-badge ${status.toLowerCase()}`}>{status}</span>
      <button className="salah-details-btn" onClick={onDetailsClick}>
        Détails de la demande
      </button>
    </div>
  );
};

export default RequestCard;
