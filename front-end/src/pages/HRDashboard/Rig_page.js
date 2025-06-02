import React, { useState, useEffect } from 'react';
import '../../style//HRDashboard.css';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom'; 

const Rigs = () => {
  return (
    <Layout>
      <RigTable />
    </Layout>
  );
};

const RigTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [newRig, setNewRig] = useState({
    id: '',
    rig: '',
    name: '',
    interval: '',
    dateIn: '',
    relieveDate: '',
  });

  const [rigs, setRigs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/rigs")
      .then((res) => res.json())
      .then((data) => setRigs(data))
      .catch((err) => console.error("Error fetching rigs:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRig((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRig = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/add-rig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRig),
      });

      const data = await response.json();

      if (response.ok) {
        setRigs((prev) => [...prev, newRig]);
        setShowModal(false);
        setNewRig({
          id: '',
          rig: '',
          name: '',
          interval: '',
          dateIn: '',
          relieveDate: '',
        });
      } else {
        alert(data.error || "Erreur lors de l'ajout du puits.");
      }
    } catch (error) {
      console.error("Error adding rig:", error);
    }
  };

  return (
    <div className="employee">
      <div className="employee-header">
        <div className="input-group">
          <label>Rig</label>
          <input type="text" placeholder="Enter Rig" />
        </div>
        <div className="input-group">
          <label>Name</label>
          <input type="text" placeholder="Enter name" />
        </div>
        <div className="input-group">
          <label>Interval</label>
          <input type="text" placeholder="Enter interval" />
        </div>
        <div className="input-group">
          <label>ID</label>
          <input type="text" placeholder="Enter ID" />
        </div>
      </div>

      <div className='employee-section'>
        <div className="table-title">Liste des puits</div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Rig</th>
              <th>Name*</th>
              <th>Interval</th>
              <th>Date in</th>
              <th>Relieve date</th>
            </tr>
          </thead>
          <tbody>
            {rigs.map((rig, index) => (
              <tr key={index}>
                <td>{rig.puit_id}</td>
                <td>{rig.code_puit}</td>
                <td>{rig.nom_puit}</td>
                <td>{rig.interval}</td>
                <td>{rig.date_debut}</td>
                <td>{rig.date_fin}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="employee-footer">
          <span>Page 1 of 100</span>
        </div>
      </div>

      <div className="employee-actions">
        <button className="add-btn" onClick={() => setShowModal(true)}>
          Ajouter un puits
        </button>
        <button className="import-btn">Importer depuis un CSV</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <h3>Ajouter un puits</h3>
            <form onSubmit={handleAddRig}>
              <div className="form-row">
                <div className="input-group-model">
                  <label>ID</label>
                  <input 
                    type="text" 
                    name="id"
                    value={newRig.id}
                    onChange={handleInputChange}
                    placeholder="Enter ID" 
                    required
                  />
                </div>
                <div className="input-group-model">
                  <label>Rig</label>
                  <input 
                    type="text" 
                    name="rig"
                    value={newRig.rig}
                    onChange={handleInputChange}
                    placeholder="Enter Rig" 
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group-model">
                  <label>Name*</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newRig.name}
                    onChange={handleInputChange}
                    placeholder="Enter name" 
                    required
                  />
                </div>
                <div className="input-group-model">
                  <label>Interval</label>
                  <input 
                    type="text" 
                    name="interval"
                    value={newRig.interval}
                    onChange={handleInputChange}
                    placeholder="Enter interval" 
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group-model">
                  <label>Date in</label>
                  <input 
                    type="date" 
                    name="dateIn"
                    value={newRig.dateIn}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group-model">
                  <label>Relieve date</label>
                  <input 
                    type="date" 
                    name="relieveDate"
                    value={newRig.relieveDate}
                    onChange={handleInputChange}
                    required
                  />
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

export default Rigs;
