import React, { useState, useEffect } from 'react';
import Header from '../../components/ChefDepart/Header';
import SidebarChefBase from '../../components/SideBarChefBase';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const EmployeesPageCB = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { field: 'id', headerName: 'Employee ID', width: 150, headerAlign: 'center' },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
    { field: 'department', headerName: 'Department', width: 180 },
    { field: 'hireDate', headerName: 'Hire Date', width: 150 },
    { field: 'residence', headerName: 'Residence', width: 150 }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/employees/CB')
      .then(response => response.json())
      .then(data => {
        setRows(data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);


  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div id="chambres-view-chef-de-base">
      <div className="side-bar-space">
        <SidebarChefBase />
      </div>
      <div className="navigation-bar-header-space">
        <Header />
      </div>
      <div id="content-rooms-view-page">
        <div id="rooms-table-container">
          <div className="flex-row-search-and-export-employee">
            <span className="table-name-title">Liste des employés</span>
            <input
              id='research-employee-employee-view-CB'
              type="text"
              placeholder="Rechercher par employé"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="export-document-button">Exporter le document</button>
          </div>
        </div>
        <div id="chambres-table-container">
          <Paper sx={{ height: 400, width: '95%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{
                border: 0.5,
                borderColor: 'grey.light',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPageCB;
