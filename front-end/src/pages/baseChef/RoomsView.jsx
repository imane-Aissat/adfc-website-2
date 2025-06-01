import React, {useState, useEffect} from "react";
import '..//../style/Roomsview.css';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import SidebarChefBase from '..//../components/SideBarChefBase';
import Header from '..//../components/HeaderChefBase';
import { blueGrey } from "@mui/material/colors";


const columns = [
    { field: 'id', headerName: 'ID', width: 70, isPrimaryKey:true, headerAlign: 'center', blueGrey },
    { field: 'Chambres', headerName: 'Chambres', width: 130,editable: true },
    { field: 'Résidents', headerName: 'Résidents', width: 250, editable: true },
    {
      field: 'Résident Actuel',
      headerName: 'Résident Actuel',
      type: 'string',
      width: 250,
      editable: true,
    },
    {
      field: 'Status',
      headerName: 'Status',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      renderCell: () => {
        return <select name="cars" id="cars">
                    <option className="Dropdown-box-chambre-status" id="dropdown-box-chambre-status-occupée" value="Occupée">Occupée</option>
                    <option className="Dropdown-box-chambre-status" id="dropdown-box-chambre-status-vide" value="Vide">Vide</option>
                    <option className="Dropdown-box-chambre-status" id="dropdown-box-chambre-status-répa" value="Réparation">Réparation</option>
                </select>;
        }
    },
  ];
  
const rows = [
    { id: 1, Chambres: '101', Résidents: 'Jon Snow', 'Résident Actuel': 'Jon Snow', Status: 'Occupée' },
    { id: 2, Chambres: '102', Résidents: 'Cersei Lannister', 'Résident Actuel': 'Cersei Lannister', Status: 'Vide' },
    { id: 3, Chambres: '103', Résidents: 'Jaime Lannister', 'Résident Actuel': 'Jaime Lannister', Status: 'Réparation' },
    { id: 4, Chambres: '104', Résidents: 'Arya Stark', 'Résident Actuel': 'Arya Stark', Status: 'Occupée' },
    { id: 5, Chambres: '105', Résidents: 'Daenerys Targaryen', 'Résident Actuel': 'Daenerys Targaryen', Status: 'Vide' },
    { id: 6, Chambres: '106', Résidents: 'Melisandre', 'Résident Actuel': 'Melisandre', Status: 'Réparation' },
    { id: 7, Chambres: '107', Résidents: 'Ferrara Clifford', 'Résident Actuel': 'Ferrara Clifford', Status: 'Occupée' },
    { id: 8, Chambres: '108', Résidents: 'Rossini Frances', 'Résident Actuel': 'Rossini Frances', Status: 'Vide' },
    { id: 9, Chambres: '109', Résidents: 'Harvey Roxie', 'Résident Actuel': 'Harvey Roxie', Status: 'Occupée' },
];

  

const paginationModel = { page: 0, pageSize: 5 };

function ChambresCBase() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
        .then(response => response.json())
        .then(data => {
            const transformedRows = data.map(room => {
                const residentsArray = room["Résidents"];  // This is ["imane", "razane"]
                const residentsNames = residentsArray.join(', ');  // "imane, razane"

                const currentResident = residentsArray.length > 0
                    ? `${residentsArray[residentsArray.length - 1].prenom} ${residentsArray[residentsArray.length - 1].nom}`
                    : "Aucun";

                return {
                    id: room.id,
                    Chambres: room.Chambres,
                    Résidents: residentsNames,
                    "Résident Actuel": currentResident,
                    Status: room.Status,
                };
            });

            setRows(transformedRows);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching room data:", error);
        });
        }, []);
    return <div id="chambres-view-chef-de-base">
        <div className="side-bar-space">
            <SidebarChefBase></SidebarChefBase>
        </div>
        <div className="navigation-bar-header-space">
            <Header></Header>
        </div>
        <div id="content-rooms-view-page">
            <div id="rooms-table-container">
                <div className="flex-row-search-and-export">
                    <span className="table-name-title">Liste de chambres</span>
                    <button className="export-document-button">Exporter le document</button>
                </div>
            </div>
            <div>
                <div id="chambres-table-container">
                    <Paper sx={{ height: 400, width: '95%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            loading={loading}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            editMode="row"
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
    </div>
}

export default ChambresCBase;