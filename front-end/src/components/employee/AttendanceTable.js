import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../style/employee/AttendanceTable.css";
import LeaveRequestModal from "./RequestLeaveModal";

const AttendanceTable = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Formatters for French date and weekday
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dayFormatter = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
  });

  const attendanceData = [
    { date: new Date(2023, 6, 29), from: "09:00", to: "18:00", status: "Présent" },
    { date: new Date(2023, 6, 30), from: "-", to: "-", status: "Absent" },
    { date: new Date(2023, 6, 27), from: "-", to: "-", status: "Absent" },
    { date: new Date(2023, 6, 22), from: "09:00", to: "12:00", status: "Partiel" },
    { date: new Date(2023, 6, 15), from: "-", to: "-", status: "Absent" },
    { date: new Date(2023, 6, 13), from: "-", to: "-", status: "Absent" },
    { date: new Date(2023, 6, 8), from: "09:00", to: "12:00", status: "Partiel" },
  ];

  return (
    <div className="salah-attendance-container">
      <div className="salah-header">
        <h2>Résumé de présence</h2>
        <div className="salah-header-actions">
          <button className="salah-calendar-btn" onClick={() => setShowCalendar(!showCalendar)}>
            📅 {date.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </button>
          <button className="salah-absence-btn" onClick={() => setShowLeaveModal(true)}>
            Demande d'absence
          </button>
        </div>
        {showCalendar && (
          <div className="salah-calendar-popup">
            <Calendar onChange={setDate} value={date} />
          </div>
        )}
      </div>

      <table className="salah-attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Jour</th>
            <th>De</th>
            <th>À</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => (
            <tr key={index}>
              <td>{dateFormatter.format(entry.date)}</td>
              <td>{dayFormatter.format(entry.date)}</td>
              <td>{entry.from}</td>
              <td>{entry.to}</td>
              <td className={`salah-${entry.status.toLowerCase()}`}>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showLeaveModal && <LeaveRequestModal onClose={() => setShowLeaveModal(false)} />}
    </div>
  );
};

export default AttendanceTable;
