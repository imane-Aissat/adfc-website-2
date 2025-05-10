import React from "react";
import "../../style/employee/RequestLeaveModal.css";

const LeaveRequestModal = ({ onClose }) => {
  return (
    <div className="salah-modal-overlay">
      <div className="salah-modal-content">
        <div className="salah-modal-header">
          <h3>Demande de congé</h3>
          <button className="salah-close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="salah-modal-body">
          <label>Type</label>
          <select>
            <option>Sélectionner le type de congé</option>
            <option>Congé maladie</option>
            <option>Vacances</option>
          </select>

          <label>Date de début</label>
          <input type="date" />

          <label>Date de fin</label>
          <input type="date" />

          <label>Raison</label>
          <textarea placeholder="Entrez votre raison"></textarea>

          <label>Télécharger un fichier</label>
          <input type="file" />

          <button className="salah-done-btn">Terminé</button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
