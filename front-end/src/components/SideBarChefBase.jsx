import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '../style/CDSidebar.css';
import { FiGrid , FiLogOut, FiMessageSquare, FiSettings, FiUser, FiKey, FiClipboard } from 'react-icons/fi';

function SidebarChefBase() {
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
              <NavLink to="/RoomsChefdeBase" className="nav-link">
                <FiKey  className="nav-icon" />
                <span>Chambres</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/EmployeesCB" className="nav-link">
                <FiUser className="nav-icon" />
                <span>Employés</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/ShiftDemandePage" className="nav-link">
                <FiMessageSquare className="nav-icon" />
                <span>Gérer les demandes</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/SettingsPageCB" className="nav-link">
                <FiSettings className="nav-icon" />
                <span>Paramètres</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="sidebar-bottom">
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut className="logout-icon" />
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}

export default SidebarChefBase;