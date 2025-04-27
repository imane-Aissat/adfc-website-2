import React, { useState } from 'react';
import '../../style/SuperAdminStyles/SuperAdminUserManagementTable.css';

const SuperAdminUserManagementTable = () => {
  const [users, setUsers] = useState([
    { name: "Alice Johnson", email: "alice@example.com", role: "Operator", status: "Active", date: "2025-04-01" },
    { name: "Bob Smith", email: "bob@example.com", role: "Supervisor", status: "Inactive", date: "2025-03-28" },
    { name: "Charlie Brown", email: "charlie@example.com", role: "Operator", status: "Active", date: "2025-02-15" },
  ]);

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const toggleStatus = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].status = updatedUsers[index].status === "Active" ? "Inactive" : "Active";
    setUsers(updatedUsers);
  };

  const handleRoleChange = (index, newRole) => {
    const updatedUsers = [...users];
    updatedUsers[index].role = newRole;
    setUsers(updatedUsers);
  };

  return (
    <div className="SuperAdminUserManagementTable-container">
      <h2 className="SuperAdminUserManagementTable-title">All Users</h2>
      <table className="SuperAdminUserManagementTable-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  className="SuperAdminUserManagementTable-roleDropdown"
                >
                  <option>Operator</option>
                  <option>Supervisor</option>
                </select>
              </td>
              <td className={user.status === "Active" ? "active" : "inactive"}>{user.status}</td>
              <td>{user.date}</td>
              <td>
                <button onClick={() => toggleStatus(index)} className="SuperAdminUserManagementTable-btn toggle">
                  {user.status === "Active" ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => handleDelete(index)} className="SuperAdminUserManagementTable-btn delete">
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
