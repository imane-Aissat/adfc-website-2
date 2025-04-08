import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./AttendanceTable.css";

const AttendanceTable = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const attendanceData = [
    { date: "29 July 2023", day: "Monday", from: "09:00", to: "18:00", status: "Present" },
    { date: "29 July 2023", day: "Saturday", from: "-", to: "-", status: "Absent" },
    { date: "29 July 2023", day: "Thursday", from: "-", to: "-", status: "Absent" },
    { date: "29 July 2023", day: "Saturday", from: "09:00", to: "12:00", status: "Partial" },
    { date: "29 July 2023", day: "Saturday", from: "-", to: "-", status: "Absent" },
    { date: "29 July 2023", day: "Thursday", from: "-", to: "-", status: "Absent" },
    { date: "29 July 2023", day: "Saturday", from: "09:00", to: "12:00", status: "Partial" },
  ];

  return (
    <div className="attendance-container">
      <div className="header">
        <h2>Attendance Overview</h2>
        <div className="header-actions">
          <button className="calendar-btn" onClick={() => setShowCalendar(!showCalendar)}>
            📅 {date.toDateString()}
          </button>
          <button className="absence-btn">Request for Absence</button>
        </div>
        {showCalendar && (
          <div className="calendar-popup">
            <Calendar onChange={setDate} value={date} />
          </div>
        )}
      </div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.day}</td>
              <td>{entry.from}</td>
              <td>{entry.to}</td>
              <td className={entry.status.toLowerCase()}>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
