import React from 'react';
import Topbar from '../../components/Topbar';
import HRSidebar from '../../components/HRSidebar';
import EmployeeTable from '../../components/EmployeeTable';
import Header from '../../components/ChefDepart/Header';

const AjoutEmployee = () => {
  return (
    <div className="dashboard-container">
      <HRSidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
};

export default AjoutEmployee;
