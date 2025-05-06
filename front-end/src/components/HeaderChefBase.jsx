import React from 'react';
import { FiBell } from 'react-icons/fi';
import '../style/CDHeader.css';

const Header = () => {
  return (
    <nav className="adfc-navbar">
      <div className="navbar-left">
        <img src="/images/adfc-logo.png" alt="ADFC Logo" className="logo" />
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Quick Search..." 
            className="search-input"
          />
        </div>
      </div>
      <div className="navbar-right">
        <div className="notification-icon">
          <FiBell className="bell-icon" />
          <span className="notification-badge">3</span>
        </div>
        <div className="admin-info">
          <span className="admin-name">Admin</span>
          <span className="admin-email">admin@adfc.in</span>
        </div>
        <img 
          src="/images/default-profile.jpg" 
          alt="Profile" 
          className="profile-pic" 
        />
      </div>
    </nav>
  );
};

export default Header;