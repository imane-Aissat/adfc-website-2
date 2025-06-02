import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '../style/CDSidebar.css';
import { FiLayout, FiLogOut, FiMessageSquare, FiSettings, FiUser } from 'react-icons/fi';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo">
          <img src="/images/adfc-logo.png" alt="ADFC Logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
            <NavLink to="/hr-dashboard" className="nav-link">Shifts</NavLink>
          </li>
          <li>
            <NavLink to="/puits" className="nav-link">Puits</NavLink>
          </li>
          <li>
            <NavLink to="/ajout-employee" className="nav-link">Ajout Employée</NavLink>
          </li>
          </ul>
        </nav>
      </div>
      
      <div className="sidebar-bottom">
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut className="logout-icon" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;