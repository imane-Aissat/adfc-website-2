import React from 'react';
import '../../style/CDRequestTable.css';

const RequestTable = () => {
  const requests = [
    {
      name: 'Ahmed Rashdan',
      requestDate: '23/09/2022',
      status: 'Sent to chef de base',
      file: 'PDF',
      startDate: '23/09/2022',
      endDate: '23/09/2022'
    },
    {
      name: 'Ali Alhamdan',
      requestDate: '23/09/2022',
      status: 'Sent to chef de base',
      file: 'PDF',
      startDate: '23/09/2022',
      endDate: '23/09/2022'
    },
    {
      name: 'Mona Alghafar',
      requestDate: '23/09/2022',
      status: 'Pending',
      file: 'PDF',
      startDate: '23/09/2022',
      endDate: '23/09/2022'
    },
    {
      name: 'Moustafa Adel',
      requestDate: '23/09/2022',
      status: 'Pending',
      file: 'PDF',
      startDate: '23/09/2022',
      endDate: '23/09/2022'
    },
    {
      name: 'Jhon Neleson',
      requestDate: '23/09/2022',
      status: 'Rejected',
      file: 'PDF',
      startDate: '23/09/2022',
      endDate: '23/09/2022'
    }
  ];

  return (
    <div className="app-container">
      <div className="request-management">
        <h1>Requests</h1>
        <table className="filter-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Request</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" placeholder="Enter Employee Name" /></td>
              <td><input type="text" placeholder="Enter Request" /></td>
              <td><input type="text" placeholder="Start Date" /></td>
              <td><input type="text" placeholder="End Date" /></td>
            </tr>
          </tbody>
        </table>

        <hr className="divider" />

        <h2>Liste des demandes</h2>

        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Request Type</th>
                <th>Status</th>
                <th>Attached Files</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={index}>
                  <td>{req.name}</td>
                  <td>{req.requestDate}</td>
                  <td>
                    <span className={`status ${req.status.replace(/ /g, '-').toLowerCase()}`}>
                      {req.status}
                    </span>
                  </td>
                  <td><a href="#">{req.file}</a></td>
                  <td>{req.startDate}</td>
                  <td>{req.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="import-button">
          <span className="import-icon">↑</span> Importer
        </button>
      </div>
    </div>
  );
};

export default RequestTable;
