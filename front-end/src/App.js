import React from "react";
import SignupPageOne from "./pages/Authentication/signuppage1"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HRDashboard from "./pages/HRDashboard/HRDashboard";
import RequestsPage from "./pages/CDRequestsPage";
import AjoutEmployee from "./pages/HRDashboard/AjoutEmployee";
import Evaluation from "./pages/HRDashboard/evaluation";
import EmployeeRotation from "./pages/HRDashboard/EmployeeRotation";
import ShiftsPage from "./pages/CDShiftsPage";
import ShiftPage from "./pages/employee/ShiftPage";
import AttendancePage from "./pages/employee/AttendancePage";
import RequestPage from "./pages/employee/RequestPage";

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
import Rigs from "./pages/HRDashboard/Rig_page";
import RigEmployeesPage from "./pages/HRDashboard/RigEmployeePgae";
import EmployeesPage from "./pages/CDEmployeesPage";
import SettingsPage from "./pages/CDSettingsPage";
function App() {
  return (
    <BrowserRouter>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Routes>
        
        <Route path="/signup" element={<SignupPageOne />} />
        <Route path="/signup2" element={<SignupPageTwo />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/RoomsChefdeBase" element={<ChambresCBase />} />
        <Route path="/EmployeesCB" element={<EmployeesPageCB />} />
        <Route path="/ReservationChambreF" element={<ReservationChambreForm />} />
        <Route path="/ShiftDemandePage" element={<ShiftDemandViewPage />} />
        <Route path="/ShiftsViewPage" element={<ShiftsPageCB />} />
        <Route path="/SettingsPageCB" element={<SettingsPageCB />} />
        <Route path="/admin_dashboard" element={<SuperAdminUserManagementPage/>}/>
        <Route path="/admin_requests" element={<SuperAdminPendingUsersPage/>}/>
         <Route path="/ajout-employee" element={<AjoutEmployee />} />
        <Route path="/evaluation" element={<Evaluation/>}/>
        <Route path="/EmployeeRotation/:employeeId" element={<EmployeeRotation/>}/>
        <Route path="/puits" element={<Rigs/>}/>
        <Route path="/puits/:rigId/list_engineers" element={<RigEmployeesPage/>}/>
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/shifts" element={<ShiftsPage/>} />
        <Route path="/requests" element={<RequestsPage/>} />
       <Route path="/settings" element={<SettingsPage/>} />
       <Route path="/employee_attendance " element={<AttendancePage />} />
        <Route path="/employee_shift" element={<ShiftPage />} />
        <Route path="/employee_notification" element={<RequestPage />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

