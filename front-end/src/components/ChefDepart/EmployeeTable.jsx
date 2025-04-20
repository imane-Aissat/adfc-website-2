import React from 'react';
import '../../style/CDEmployeeTable.css';
const EmployeeTable = () => {
  const employees = [
    {
      id: '2341421',
      name: 'Ahmed Rashdan',
      role: 'Help Desk Executive',
      department: 'IT Department',
      hireDate: '15 Aout 2003',
      residence: 'Alger'
    },
    {
      id: '3411421',
      name: 'Ali Alhamdan',
      role: 'Senior Executive',
      department: 'Marketing',
      hireDate: '15 Aout 2003',
      residence: 'Alger'
    },
    {
      id: '2341121',
      name: 'Mona Alghafar',
      role: 'Senior Manager',
      department: 'Design',
      hireDate: '15 Aout 2003',
      residence: 'Alger'
    },
    {
      id: '2341421',
      name: 'Moustafa Adel',
      role: 'Director',
      department: 'Development',
      hireDate: '15 Aout 2003',
      residence: 'Alger'
    },
    {
      id: '2341421',
      name: 'Jhon Neleson',
      role: 'Director',
      department: 'Sales',
      hireDate: '15 Aout 2003',
      residence: 'Alger'
    },
    {
      id: '2341421',
      name: 'Kadi Manela',
      role: 'System coordinator',
      department: 'IT Department',
      hireDate: '15 Aout 2003',
      residence: 'Alger'
    }
  ];

  return (
    <div className="app-container">
    <div className="employee-management">
      <h1>Employees</h1>
        <table className="filter-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Department</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" placeholder="Enter Employee Name" /></td>
            <td><input type="text" placeholder="Enter Role" /></td>
            <td><input type="text" placeholder="Start Department" /></td>
            <td><input type="text" placeholder="Enter ID" /></td>
          </tr>
        </tbody>
      </table>

      <hr className="divider" />

      <h2>Liste des employés</h2>
      
      {/* Main Employee Table */}
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employé</th>
              <th>Role ▼</th>
              <th>Department ▼</th>
              <th>Date emb</th>
              <th>Residence ▼</th>
              <th>▼</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td>{employee.hireDate}</td>
                <td>{employee.residence}</td>
                <td><button className="view-btn">voir plus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
      </div>
      <button className="import-button">
          <span className="import-icon">↑</span> Importer
        </button>
    </div>
    </div>
  );
};

export default EmployeeTable;