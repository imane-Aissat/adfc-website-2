import React from 'react';
import Header from '..//../components/ChefDepart/Header';
import SidebarChefBase from '..//../components/SideBarChefBase';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const EmployeesPageCB = () => {
  const columns = [
    { field: 'id', headerName: 'Employee ID', width: 150, headerAlign: 'center' },
    { field: 'name', headerName: 'Name', width: 200, editable: true },
    { field: 'role', headerName: 'Role', width: 200, editable: true },
    { field: 'department', headerName: 'Department', width: 180, editable: true },
    { field: 'hireDate', headerName: 'Hire Date', width: 150, editable: true },
    { field: 'residence', headerName: 'Residence', width: 150, editable: true }
  ];

  const rows = [
    { id: '2341421', name: 'Ahmed Rashdan', role: 'Help Desk Executive', department: 'IT Department', hireDate: '15 Aoul 2003', residence: 'Alger' },
    { id: '3411421', name: 'Ali Alhamdan', role: 'Senior Executive', department: 'Marketing', hireDate: '15 Aoul 2003', residence: 'Alger' },
    { id: '2341121', name: 'Mona Alghafar', role: 'Senior Manager', department: 'Design', hireDate: '15 Aoul 2003', residence: 'Alger' },
    { id: '2341422', name: 'Moustafa Adel', role: 'Director', department: 'Development', hireDate: '15 Aoul 2003', residence: 'Alger' },
    { id: '2341423', name: 'Jihan Nelesan', role: 'Director', department: 'Sales', hireDate: '15 Aoul 2003', residence: 'Alger' },
    { id: '2341424', name: 'Kadi Manela', role: 'System coordinator', department: 'IT Department', hireDate: '15 Aoul 2003', residence: 'Alger' }
  ];
  
  const paginationModel = { page: 0, pageSize: 5 };

  const currentPage = 1;
  const totalPages = 100;

  return <div id="chambres-view-chef-de-base">
        <div className="side-bar-space">
            <SidebarChefBase></SidebarChefBase>
        </div>
        <div className="navigation-bar-header-space">
            <Header></Header>
        </div>
        <div id="content-rooms-view-page">
            <div id="rooms-table-container">
                <div className="flex-row-search-and-export-employee">
                    <span className="table-name-title">Liste des employés</span>
                    <input id='research-employee-employee-view-CB' type="text" placeholder="Enter Employee Name" />
                    <button className="export-document-button">Exporter le document</button>
                </div>
            </div>
            <div>
                <div id="chambres-table-container">
                    <Paper sx={{ height: 400, width: '95%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            editMode="row"
                            checkboxSelection
                            sx={
                                { 
                                    border: 0.5, 
                                    borderColor: 'grey.light',
                                    '& .MuiDataGrid-cell:hover': {
                                        color: 'primary.main',
                                    },
                                }
                            }
                        />
                    </Paper>
                </div>
            </div>
        </div>
    </div>
};

export default EmployeesPageCB;