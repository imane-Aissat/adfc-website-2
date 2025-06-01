import React, { useEffect, useState } from "react";
import "../../style/SuperAdminStyles/SuperAdminPendingUsersTable.css";

const SuperAdminPendingUsersTable = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/pending-users");
        const data = await response.json();
        if (response.ok) {
          setPendingUsers(data);
        } else {
          console.error("Failed to fetch users:", data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleAccept = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/accept-user/${userId}`, {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
        alert(data.message || "User accepted.");
      } else {
        alert("Failed to accept user.");
      }
    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/reject-user/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
        alert(data.message || "User rejected.");
      } else {
        alert("Failed to reject user.");
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <div className="SuperAdminPendingUsersTable-container">
      <h2 className="SuperAdminPendingUsersTable-title">Pending User Approvals</h2>
      <table className="SuperAdminPendingUsersTable-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user) => (
            <tr key={user.utilisateur_id}>
              <td>{user.utilisateur_id}</td>
              <td>{user.nom}</td>
              <td>{user.prénom}</td>
              <td>{user.email}</td>
              <td>{user.statut_compte}</td>
              <td>{user.role_name}</td> {/* Must be included from backend */}
              <td>
                <button className="accept-btn" onClick={() => handleAccept(user.utilisateur_id)}>Accept</button>
                <button className="reject-btn" onClick={() => handleReject(user.utilisateur_id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminPendingUsersTable;
