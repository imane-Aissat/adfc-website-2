import React from "react";
import ShiftCard from "../../components/employee/ShiftCard";
import AttendanceTable from "../../components/employee/AttendanceTable";
import "../../style/employee/AttendancePage.css";

const AttendancePage = () => {
  return (
    <div className="salah-attendance-page">
      <div className="salah-left-section">
        <ShiftCard />
      </div>
      <div className="salah-right-section">
        <AttendanceTable />
      </div>
    </div>
  );
};

export default AttendancePage;
