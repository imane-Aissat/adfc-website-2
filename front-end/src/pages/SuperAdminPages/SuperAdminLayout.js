import React from 'react';
import SuperAdminSideBar from '../../components/SuperAdminComponents/SuperAdminSideBar';
import SuperAdminHeader from '../../components/SuperAdminComponents/SuperAdminHeader';
import '../../style/SuperAdminStyles/SuperAdminLayout.css';

function SuperAdminLayout({ children }) {
  return (
    <div className="SuperAdminLayout">
      <SuperAdminSideBar />
      <div className="SuperAdminLayout-main">
        <SuperAdminHeader />
        <div className="SuperAdminLayout-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminLayout;
