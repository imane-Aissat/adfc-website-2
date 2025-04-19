import React from "react";
import ShiftCard from "./components/AttendanceTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HRDashboard from "./pages/HRDashboard/HRDashboard";
import HRSidebar from "./components/HRSidebar";
import AjoutEmployee from "./pages/HRDashboard/AjoutEmployee";
import Evaluation from "./pages/HRDashboard/evaluation";
import EmployeeRotation from "./pages/HRDashboard/EmployeeRotation";

import SuperAdminNotificationPage from './pages/SuperAdminPages/SuperAdminNotificationPage';
import SuperAdminPendingUsersPage from './pages/SuperAdminPages/SuperAdminPendingUsersPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SuperAdminPendingUsersPage />} />
   
    { /*<Route path="/" element={<AjoutEmployee />} />*/}

    
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;