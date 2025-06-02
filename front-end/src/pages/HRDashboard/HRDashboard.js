import React from 'react';
import '../../style/HRDashboard.css';
import HRSidebar from '../../components/HRSidebar';
import Topbar from '../../components/Topbar';
import Header from '../../components/ChefDepart/Header';
import ShiftsPage from '../CDShiftsPage';
import ShiftCalendar from '../../components/ChefDepart/ShiftCalendar';
import Layout from '../../components/Layout';
function HRDashboard() {
  return (
    <div className="dashboard-container">
      <HRSidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <ShiftsPage></ShiftsPage>
        </div>
      </div>
    </div>
    
  );
}
export default HRDashboard;
