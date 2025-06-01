import React, { useEffect, useState } from 'react';
import '../../style/SuperAdminStyles/SuperAdminUserManagementTable.css';

const SuperAdminUserManagementTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/all-users");
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-user/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
        alert(data.message || "User deleted.");
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
  const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
  try {
    const response = await fetch(`http://localhost:5000/update-status/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut_compte: newStatus }),
    });

    if (response.ok) {
      // ✅ Update UI immediately
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, statut_compte: newStatus } : user
        )
      );
    } else {
      const errorData = await response.json();
      console.error("Failed to update:", errorData);
      alert("Failed to update status.");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    alert("An error occurred while updating.");
  }
};



  const handleRoleChange = async (userId, newRoleName) => {
    try {
      const response = await fetch(`http://localhost:5000/update-role/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role_name: newRoleName }),
      });
      const data = await response.json();
      if (response.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, role_name: newRoleName } : user
          )
        );
      } else {
        alert("Failed to update role.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="SuperAdminUserManagementTable-container">
      <h2 className="SuperAdminUserManagementTable-title">All Users</h2>
      <table className="SuperAdminUserManagementTable-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nom}</td>
              <td>{user.prénom}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className={user.statut_compte === "active" ? "active" : "inactive"}>
                {user.statut_compte}
              </td>
              <td>
                <button
                  onClick={() => toggleStatus(user.id, user.statut_compte)}
                  className="SuperAdminUserManagementTable-btn toggle"
                >
                  {user.statut_compte === "Active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="SuperAdminUserManagementTable-btn delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminUserManagementTable;
