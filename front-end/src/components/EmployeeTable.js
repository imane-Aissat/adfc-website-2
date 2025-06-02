import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import "../style/HRDashboard.css";
import { ChevronLeft } from 'react-feather';

const EmployeeTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    id: "",
    nom: "",
    prenom: "",
    fonction: "",
    id_equipe: "",
  });

  const [newEmployee, setNewEmployee] = useState({
    nom: "",
    prenom: "",
    email: "",
    mot_de_passe: "",
    compte_status: "Inactive",
    fonction: "",
    id_equipe: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const isRigEngineersView = location.pathname.includes("/puits/");
  const rigId = isRigEngineersView ? location.pathname.split("/").pop() : null;

  // Simplified fetchEmployees function like the working code style
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/list-employees");
        const data = await response.json();

        if (response.ok) {
          setEmployees(data);
          setError(null);
        } else {
          setError(data.error || "Erreur lors du chargement des employés.");
        }
      } catch (error) {
        setError("Erreur lors du chargement des employés.");
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const dataToSend = {
      nom: newEmployee.nom,
      prenom: newEmployee.prenom,
      email: newEmployee.email,
      mot_de_passe: newEmployee.mot_de_passe,
      compte_status: newEmployee.compte_status,
      fonction: newEmployee.fonction,
      shift_id: newEmployee.shift_id ? parseInt(newEmployee.shift_id) : null,
      id_equipe: newEmployee.id_equipe ? parseInt(newEmployee.id_equipe) : null,
    };

    try {
      const response = await fetch("http://localhost:5000/api/list-employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Database insertion failed");
      }

      setShowModal(false);
      // Refresh employees list after adding
      const refreshed = await fetch("http://localhost:5000/api/list-employees");
      const refreshedData = await refreshed.json();
      if (refreshed.ok) {
        setEmployees(refreshedData);
        setError(null);
      }
      // Clear form
      setNewEmployee({
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: "",
        compte_status: "Inactive",
        fonction: "",
        id_equipe: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };
const handleDeleteEmployee = async (id_employee) => {
  try {
    const response = await fetch(`http://localhost:5000/api/delete-employee/${id_employee}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (response.ok) {
      // Remove deleted employee from state so UI updates
      setEmployees((prev) => prev.filter((emp) => emp.id_employee !== id_employee));
      alert(data.message || "Employé supprimé avec succès.");
    } else {
      alert("Échec de la suppression de l'employé.");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert("Erreur lors de la suppression de l'employé.");
  }
};


  // NOTE: We do NOT use loading state to conditionally render,
  // so show error only if it exists, otherwise show table (even if empty)

  return (
    <div className="employee">
      {isRigEngineersView && (
        <div className="navigation-links">
          <button onClick={() => navigate(-1)} className="back-link">
            <ChevronLeft size={16} /> Puits
          </button>
          <span className="rig-name">Rig-{rigId}</span>
        </div>
      )}

      <div className="employee-header">
        {["id", "nom", "prenom", "fonction", "id_equipe"].map((key) => (
          <div key={key} className="input-group">
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type="text"
              name={key}
              value={filters[key]}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              placeholder={key === "id_equipe" ? "ID Équipe" : key}
            />
          </div>
        ))}
      </div>

      <div className="employee-section">
        <div className="table-title">Liste des employés</div>

        {error && <div className="error" style={{ color: "red", marginBottom: "1em" }}>Erreur: {error}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Statut</th>
              <th>Fonction</th>
              <th>Équipe</th>
             
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id_employee}>
                  <td>{emp.id_employee}</td>
                  <td>{emp.nom}</td>
                  <td>{emp.prenom}</td>
                  <td>{emp.email}</td>
                  <td>{emp.compte_status}</td>
                  <td>{emp.fonction}</td>
                  <td>{emp.id_equipe || "-"}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteEmployee(emp.id_employee)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  Aucun employé trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="employee-actions">
        {!isRigEngineersView && (
          <>
            <button className="add-btn" onClick={() => setShowModal(true)}>
              Ajouter un employé
            </button>
            <button className="import-btn">Importer depuis un CSV</button>
          </>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button
              className="close-btn"
              onClick={() => {
                setShowModal(false);
                setError(null);
                setNewEmployee({
                  nom: "",
                  prenom: "",
                  email: "",
                  mot_de_passe: "",
                  compte_status: "Inactive",
                  fonction: "",
                  id_equipe: "",
                });
              }}
            >
              ×
            </button>
            <h3>Ajouter un employé</h3>

            {error && <div className="error-message" style={{ color: "red" }}>{error}</div>}

            <form onSubmit={handleAddEmployee}>
              <div className="form-row">
                <div className="input-group-model">
                  <label>Nom*</label>
                  <input
                    type="text"
                    value={newEmployee.nom}
                    onChange={(e) => setNewEmployee({ ...newEmployee, nom: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group-model">
                  <label>Prénom*</label>
                  <input
                    type="text"
                    value={newEmployee.prenom}
                    onChange={(e) => setNewEmployee({ ...newEmployee, prenom: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group-model">
                  <label>Email*</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group-model">
                  <label>Mot de passe*</label>
                  <input
                    type="password"
                    value={newEmployee.mot_de_passe}
                    onChange={(e) => setNewEmployee({ ...newEmployee, mot_de_passe: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group-model">
                  <label>Fonction*</label>
                  <input
                    type="text"
                    value={newEmployee.fonction}
                    onChange={(e) => setNewEmployee({ ...newEmployee, fonction: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group-model">
                  <label>Statut du compte</label>
                  <select
                    value={newEmployee.compte_status}
                    onChange={(e) => setNewEmployee({ ...newEmployee, compte_status: e.target.value })}
                  >
                    <option value="Active">Actif</option>
                    <option value="Inactive">Inactif</option>
                    <option value="pending">En attente</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group-model">
                  <label>ID Équipe</label>
                  <input
                    type="number"
                    value={newEmployee.id_equipe || ""}
                    onChange={(e) =>
                      setNewEmployee({
                        ...newEmployee,
                        id_equipe: e.target.value ? parseInt(e.target.value) : "",
                      })
                    }
                  />
                </div>
              </div>

              <div className="modal-buttons">
                <button type="button" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
