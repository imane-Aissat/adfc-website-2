import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ShiftPage from "./pages/employee/ShiftPage";
import AttendancePage from "./pages/employee/AttendancePage";
import RequestPage from "./pages/employee/RequestPage";
import Navbar from "./components/employee/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '60px' }}>
        <Routes>
          <Route path="/" element={<AttendancePage />} />
          <Route path="/shift" element={<ShiftPage />} />
          <Route path="/notification" element={<RequestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
