import React from "react";
import "../../style/employee/RequestDetailsModal.css";

const RequestDetailsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="salah-modal-overlay">
      <div className="salah-modal-content">
        <div className="salah-modal-header">
          <h2>Demande de détails</h2>
          <button className="salah-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="salah-modal-body">
          <label>Quart de travail</label>
          <select className="salah-shift-select">
            <option>Sélectionner le quart de travail</option>
            <option>Matin</option>
            <option>Soir</option>
          </select>

          <label>Raison</label>
          <textarea placeholder="Entrez votre raison"></textarea>

          <label>Télécharger un fichier</label>
          <input type="file" />

          <div className="salah-modal-buttons">
            <button className="salah-annuler-btn" onClick={onClose}>Annuler</button>
            <button className="salah-update-btn">Mettre à jour</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
