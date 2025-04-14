import React from 'react';
import '../style/Topbar.css';
import { AiOutlineBell } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-logo">
        <img src="/assets/adfc.jpg" alt="ADFC Logo" />
      </div>
      <div className="topbar-controls">
        <AiOutlineBell className="icon yellow-bg" />
        <FiSettings className="icon yellow-bg" />
        <div className="user-info orange-bg">
          <FaUserCircle className="icon" />
          <div>
            <div className="user-name">Admin</div>
            <div className="user-email">admin@domain.in</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
