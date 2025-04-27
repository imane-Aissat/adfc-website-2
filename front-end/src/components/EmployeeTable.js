import React, { useState } from 'react';
import "../style/HRDashboard.css";
import { NavLink } from 'react-router-dom';

const EmployeeTable = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddEmployee = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="employee">
      <div className="employee-header">
        <div className="input-group">
          <label>Nom de l'employé</label>
          <input type="text" placeholder="Enter Employee Name" />
        </div>
        <div className="input-group">
          <label>Poste</label>
          <input type="text" placeholder="Enter Role" />
        </div>
        <div className="input-group">
          <label>Département</label>
          <input type="text" placeholder="Start Department" />
        </div>
        <div className="input-group">
          <label>ID</label>
          <input type="text" placeholder="Enter ID" />
        </div>
      </div>

      <div className='employee-section'>
        <div className="table-title">Liste des employés</div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employé</th>
              <th>Role</th>
              <th>Department</th>
              <th>Date emb</th>
              <th>Residence</th>
              <th>Rotation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2341421</td>
              <td>Ahmed Rashdan</td>
              <td>Help Desk Executive</td>
              <td>IT Department</td>
              <td>15 Aout 2003</td>
              <td>Alger</td>
              <td><NavLink to="/EmployeeRotation">voir plus</NavLink></td>
            </tr>
            <tr>
              <td>3411421</td>
              <td>Ali Ahamdan</td>
              <td>Senior Executive</td>
              <td>Marketing</td>
              <td>15 Aout 2003</td>
              <td>Alger</td>
              <td><a href="#">voir plus</a></td>
            </tr>
          </tbody>
        </table>
        <div className="employee-footer">
          <span>Page 1 of 100</span>
        </div>
      </div>

      <div className="employee-actions">
        <button className="add-btn" onClick={handleAddEmployee}>Ajouter un employé</button>
        <button className="import-btn">Importer depuis un CSV</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
        <div className="modal-card">
          <button className="close-btn" onClick={handleClose}>×</button>
          <h3>Ajouter un employé</h3>
          <form className="modal-form">
            <div className="form-row">
              <div className="input-group-model">
                <label>Nom</label>
                <input type="text" placeholder="Nom" />
              </div>
              <div className="input-group-model">
                <label>Poste</label>
                <input type="text" placeholder="Poste" />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group-model">
                <label>Département</label>
                <input type="text" placeholder="Département" />
              </div>
              <div className="input-group-model">
                <label>Date d'embauche</label>
                <input type="date" />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group-model">
                <label>Résidence</label>
                <input type="text" placeholder="Résidence" />
              </div>
              <div className="input-group-model">
                <label>ID</label>
                <input type="text" placeholder="ID" />
              </div>
            </div>
            <div className="modal-buttons">
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
      )}
    </div>
  );
};

export default EmployeeTable;

