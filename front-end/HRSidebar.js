import React from 'react';
import '../style/HRSidebar.css';
import { NavLink } from "react-router-dom";

function HRSidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/assets/adfc.jpg" alt="ADFC Logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className="nav-link">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/puits" className="nav-link">Puits</NavLink>
          </li>
          <li>
            <NavLink to="/ajout-employee" className="nav-link">Ajout Employée</NavLink>
          </li>
          <li>
            <NavLink to="/evaluation" className="nav-link">Evaluation</NavLink>
          </li>
          <li>
            <NavLink to="/prediction" className="nav-link">Prediction</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default HRSidebar;
