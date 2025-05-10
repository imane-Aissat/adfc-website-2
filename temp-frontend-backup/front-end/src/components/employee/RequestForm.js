import React from 'react';
import '../../style/employee/RequestForm.css';

const RequestForm = ({ onClose }) => {
  return (
    <div className="salah-overlay">
      <div className="salah-form-container">
        <div className="salah-form-header">
          <h3>Demande de modification</h3>
          <button className="salah-close-btn" onClick={onClose}>✕</button>
        </div>

        <label>Quart de travail</label>
        <select>
          <option>Sélectionner le quart de travail</option>
          <option>TRAVAIL</option>
          <option>REPOS</option>
        </select>

        <label>Raison</label>
        <textarea placeholder="Entrez votre raison"></textarea>

        <label>Télécharger un fichier</label>
        <input type="file" />

        <button className="salah-done-btn">Terminé</button>
      </div>
    </div>
  );
};

export default RequestForm;
