import React from "react";
import "../../style/SuperAdminStyles/SuperAdminPendingUsersTable.css";

const SuperAdminPendingUsersTable = () => {
  const pendingUsers = [
    { name: "Emma Watson", email: "emma@example.com", role: "Operator", date: "18 April 2025" },
    { name: "John Doe", email: "john@example.com", role: "Supervisor", date: "17 April 2025" },
    { name: "Ava Smith", email: "ava@example.com", role: "Technician", date: "16 April 2025" },
  ];

  const handleAccept = (name) => {
    alert(`Accepted ${name}`);
    // Here you would send a request to the backend
  };

  const handleReject = (name) => {
    alert(`Rejected ${name}`);
    // Here you would send a request to the backend
  };

  return (
    <div className="SuperAdminPendingUsersTable-container">
      <h2 className="SuperAdminPendingUsersTable-title">Pending User Approvals</h2>
      <table className="SuperAdminPendingUsersTable-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Sign-up Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.date}</td>
              <td>
                <button className="accept-btn" onClick={() => handleAccept(user.name)}>Accept</button>
                <button className="reject-btn" onClick={() => handleReject(user.name)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminPendingUsersTable;
