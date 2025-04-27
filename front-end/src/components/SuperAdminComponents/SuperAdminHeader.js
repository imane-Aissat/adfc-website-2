import React from 'react';
import { FiBell } from 'react-icons/fi';
import '../../style/SuperAdminStyles/SuperAdminHeader.css';

const SuperAdminHeader = () => {
  return (
    <nav className="superadmin-adfc-navbar">
      <div className="superadmin-navbar-left">
        <img src="/assets/adfc-logo.png" alt="ADFC Logo" className="superadmin-logo" />
        <div className="superadmin-search-container">
          <input 
            type="text" 
            placeholder="Quick Search..." 
            className="superadmin-search-input"
          />
        </div>
      </div>
      <div className="superadmin-navbar-right">
        <div className="superadmin-notification-icon">
          <FiBell className="superadmin-bell-icon" />
          <span className="superadmin-notification-badge">3</span>
        </div>
        <div className="superadmin-admin-info">
          <span className="superadmin-admin-name">Admin</span>
          <span className="superadmin-admin-email">admin@adfc.in</span>
        </div>
        <img 
          src="/assets/default-profile.jpg" 
          alt="Profile" 
          className="superadmin-profile-pic" 
        />
      </div>
    </nav>
  );
};

export default SuperAdminHeader;
