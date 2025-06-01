import React from "react";
import ShiftCard from "./components/AttendanceTable";
import SignupPageOne from "./pages/Authentication/signuppage1"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HRDashboard from "./pages/HRDashboard/HRDashboard";
import HRSidebar from "./components/HRSidebar";
import AjoutEmployee from "./pages/HRDashboard/AjoutEmployee";
import Evaluation from "./pages/HRDashboard/evaluation";
import EmployeeRotation from "./pages/HRDashboard/EmployeeRotation";

import SuperAdminNotificationPage from './pages/SuperAdminPages/SuperAdminNotificationPage';
import SuperAdminPendingUsersPage from './pages/SuperAdminPages/SuperAdminPendingUsersPage';
import SuperAdminUserManagementPage from './pages/SuperAdminPages/SuperAdminUserManagementPage';
import SignupPageTwo from "./pages/Authentication/signuppage2";
import LoginPage from "./pages/Authentication/loginPage";
import ChambresCBase from "./pages/baseChef/RoomsView";
import EmployeesPageCB from "./pages/baseChef/EmployeesView";
import ReservationChambreForm from "./pages/baseChef/RoomsReservationForm";
import ShiftDemandViewPage from "./pages/baseChef/ShiftsDemandView";
import ShiftsPageCB from "./pages/baseChef/ShiftsViewPage";
import SettingsPageCB from "./pages/baseChef/SettingsPageCB";


function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Routes>
        
        <Route path="/" element={<SignupPageOne />} />
        <Route path="/signup2" element={<SignupPageTwo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/RoomsChefdeBase" element={<ChambresCBase />} />
        <Route path="/EmployeesCB" element={<EmployeesPageCB />} />
        <Route path="/ReservationChambreF" element={<ReservationChambreForm />} />
        <Route path="/ShiftDemandePage" element={<ShiftDemandViewPage />} />
        <Route path="/ShiftsViewPage" element={<ShiftsPageCB />} />
        <Route path="/SettingsPageCB" element={<SettingsPageCB />} />
      </Routes>
    </div>
  );
}

export default App;
