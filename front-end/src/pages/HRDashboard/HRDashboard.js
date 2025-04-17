import React from 'react';
import '../../style/HRDashboard.css';
import HRSidebar from '../../components/HRSidebar';
import Topbar from '../../components/Topbar';

function HRDashboard() {
  return (
    <div className="dashboard-container">
      <HRSidebar />
      <main className="main-content">
        <Topbar />

        <section className="insight-panel">
          <div className="insight-box">
            <div className="time">8:02:09 AM</div>
            <div className="date">Aujourd'hui: <strong>7 mars 2025</strong></div>
            <button className="eval-btn">Voir l'évaluation</button>
          </div>
          <div className="stat-box">
            <h2>452</h2>
            <p>Total des employés</p>
          </div>
          <div className="stat-box">
            <h2>200</h2>
            <p>Travail sur site</p>
          </div>
          <div className="stat-box">
            <h2>30</h2>
            <p>Absent</p>
          </div>
        </section>

        <section className="chart-panel">
          <h3>Utilisation globale</h3>
          <img src="/chart-placeholder.png" alt="Utilisation Graph" className="chart-img" />
        </section>

        <section className="attendance-section">
          <div className="attendance-header">
            <h3 className="attendance-title">Attendance Overview</h3>
            <input type="text" placeholder="Quick Search..." />
            <input type="date" />
            <button className="eval-btn">Voir l'évaluation</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employée</th>
                <th>Rôle</th>
                <th>Département</th>
                <th>Date</th>
                <th>Status</th>
                <th>Date d'arrivée</th>
                <th>Date de départ</th>
                <th>Rotation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Yasmine A.</td>
                <td>Ingénieur</td>
                <td>Tech</td>
                <td>2025-04-12</td>
                <td>Présent</td>
                <td>2025-04-01</td>
                <td>2025-06-30</td>
                <td><a href="#">Voir plus</a></td>
              </tr>
              <tr>
                <td>002</td>
                <td>Ali Mohamed Aiteur</td>
                <td>RH</td>
                <td>Ressources Humaines</td>
                <td>2025-04-12</td>
                <td>Absent</td>
                <td>2025-01-15</td>
                <td>2025-04-10</td>
                <td><a href="#">Voir plus</a></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
export default HRDashboard;
