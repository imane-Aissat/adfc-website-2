import React from 'react';
import "../style/HRDashboard.css";

const EvaluationTable = () => {
  const evaluations = [
    {
      id: "2341421",
      employe: "Ahmed Rashdan",
      experience: "5 ans",
      compProf: 85,
      attComm: 75,
      utilisation: 60,
      evaluation: 62,
      remarque: "Bon travail",
    },
    {
      id: "3411421",
      employe: "Ali Ahamdan",
      experience: "3 ans",
      compProf: 45,
      attComm: 50,
      utilisation: 50,
      evaluation: 42,
      remarque: "À améliorer",
    },
  ];

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

      <div className="employee-section">
        <div className="table-title">Évaluations des employés</div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employé</th>
              <th>Expérience</th>
              <th>Comp. prof. (0-100)</th>
              <th>Att. & comm. (0-100)</th>
              <th>Utilisation</th>
              <th>Évaluation</th>
              <th>Remarque</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((emp, index) => (
              <tr key={index}>
                <td>{emp.id}</td>
                <td>{emp.employe}</td>
                <td>{emp.experience}</td>
                <td>{emp.compProf}</td>
                <td>{emp.attComm}</td>
                <td>{emp.utilisation}</td>
                <td style={{ color: emp.evaluation < 50 ? "red" : "green" }}>
                  {emp.evaluation}
                </td>
                <td>{emp.remarque}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="employee-footer">
          <span>Page 1 of 50</span>
        </div>
      </div>

      <div className="employee-actions">
        <button className="export-btn">Exporter</button>
      </div>
    </div>
  );
};

export default EvaluationTable;
