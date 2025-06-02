import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '../../style/SuperAdminStyles/SuperAdminSideBar.css';
import { FiLayout, FiLogOut, FiMessageSquare, FiSettings, FiUser } from 'react-icons/fi';

function SuperAdminSideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <aside className="superadmin-sidebar">
      <div className="superadmin-sidebar-top">
        <div className="superadmin-logo">
          <img src="/assets/adfc-logo.png" alt="ADFC Logo" />
        </div>
        <nav className="superadmin-sidebar-nav">
          <ul>
            <li>
              <NavLink to="/employees" className="superadmin-nav-link">
                <FiUser className="superadmin-nav-icon" />
                <span>Notifications</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin_requests" className="superadmin-nav-link">
                <FiMessageSquare className="superadmin-nav-icon" />
                <span>Pending Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin_dashboard" className="superadmin-nav-link">
                <FiLayout className="superadmin-nav-icon" />
                <span>User Management</span>
              </NavLink>
            </li>
            
          </ul>
        </nav>
      </div>

      <div className="superadmin-sidebar-bottom">
        <button onClick={handleLogout} className="superadmin-logout-btn">
          <FiLogOut className="superadmin-logout-icon" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default SuperAdminSideBar;
