import React from 'react';
import '../../style/CDEmployeeTable.css';

const EmployeeTable = ({ employees }) => {
  return (
    <div className="app-container">
      <div className="employee-management">
        <h1>Employees</h1>
        <table className="filter-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>ID</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" placeholder="Enter Employee Name" /></td>
              <td><input type="text" placeholder="Enter Role" /></td>
              <td><input type="text" placeholder="Enter ID" /></td>
              <td><input type="text" placeholder="Enter Email" /></td>
              <td><input type="text" placeholder="Enter Status" /></td>
            </tr>
          </tbody>
        </table>

        <hr className="divider" />
        <h2>Liste des employés</h2>

        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employé</th>
                <th>Role ▼</th>
                <th>Email</th>
                <th>Status ▼</th>
                <th>▼</th>
              </tr>
            </thead>
            <tbody>
              {(employees || []).map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.email}</td>
                  <td>{employee.status}</td>
                  <td><button className="view-btn">voir plus</button></td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination"></div>
        <button className="import-button">
          <span className="import-icon">↑</span> Importer
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;