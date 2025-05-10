import React, { useState } from 'react';
import '../../style/employee/Navbar.css';
import { NavLink } from 'react-router-dom';
import { FiBell, FiSearch } from 'react-icons/fi';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="salah-navbar">
      {/* Logo */}
      <div className="salah-navbar-logo">
        <img src="/images/adfc-logo.png" alt="Logo" />
      </div>

      {/* Liens de page */}
      <div className="salah-navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) => `salah-nav-link ${isActive ? 'active' : ''}`}
        >
          Présence
        </NavLink>
        <NavLink
          to="/shift"
          className={({ isActive }) => `salah-nav-link ${isActive ? 'active' : ''}`}
        >
          Poste
        </NavLink>
      </div>

      {/* Barre de recherche */}
      <div className="salah-navbar-search">
        <FiSearch className="salah-search-icon" />
        <input type="text" placeholder="Recherche rapide..." />
      </div>

      {/* Icônes à droite */}
      <div className="salah-navbar-right">
        <NavLink to="/notification" className="salah-icon-button">
          <FiBell className="salah-notification-icon" />
        </NavLink>

        <div className="salah-profile-image" onClick={handleProfileClick}>
          <img src="/images/profile.jpeg" alt="Profil" />
        </div>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="salah-dropdown-menu">
            <ul>
              <li><NavLink to="/parametres">Paramètres</NavLink></li>
              <li><NavLink to="/deconnexion">Déconnecter</NavLink></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
