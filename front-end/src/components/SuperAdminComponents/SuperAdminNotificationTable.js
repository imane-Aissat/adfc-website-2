import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '../../style//SuperAdminStyles/SuperAdminNotificationTable.css';




const SuperAdminNotificationTable = () => {
  const notificationData = [
    { date: "18 April 2025", time: "09:15", name: "Alice Johnson", action: "Sign up" },
    { date: "18 April 2025", time: "10:30", name: "Bob Smith", action: "Log in" },
    { date: "17 April 2025", time: "11:45", name: "Charlie Brown", action: "Log out" },
    { date: "17 April 2025", time: "08:20", name: "Diana Miller", action: "Sign up" },
    { date: "17 April 2025", time: "08:20", name: "Diana Miller", action: "Sign up" },
    { date: "17 April 2025", time: "08:20", name: "Diana Miller", action: "Sign up" },
    { date: "17 April 2025", time: "08:20", name: "Diana Miller", action: "Sign up" },
    { date: "17 April 2025", time: "08:20", name: "Diana Miller", action: "Sign up" },
    { date: "17 April 2025", time: "08:20", name: "Diana Miller", action: "Sign up" },
  ];

  return (
    
    <div className="SuperAdminNotificationTable-container" id="SuperAdminNotificationTable-container">
      <h2 className="SuperAdminNotificationTable-title">User Activity Notifications</h2>
      <table className="SuperAdminNotificationTable-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notificationData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
              <td>{entry.name}</td>
              <td className={
                entry.action === "Log in"
                  ? "SuperAdminNotificationTable-login"
                  : entry.action === "Log out"
                  ? "SuperAdminNotificationTable-logout"
                  : "SuperAdminNotificationTable-signup"
              }>
                {entry.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default SuperAdminNotificationTable;
