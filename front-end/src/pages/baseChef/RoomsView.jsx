import React, { useState, useEffect } from "react";
import '../../style/Roomsview.css';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import SidebarChefBase from '../../components/SideBarChefBase';
import Header from '../../components/HeaderChefBase';
import { blueGrey } from "@mui/material/colors";

function ChambresCBase() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetch("http://localhost:5000/api/rooms")
            .then(response => response.json())
            .then(data => {
                const transformedRows = data.map(room => {
                    const residentsArray = room["Résidents"];
                    const residentsNames = residentsArray.map(r => r.name).join(', ');

                    const currentResident = residentsArray.length > 0
                    ? `${residentsArray[residentsArray.length - 1].name} ${residentsArray[residentsArray.length - 1].prenom}`
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

    const handleStatusChange = (event, id) => {
        const newStatus = event.target.value;

        const updatedRows = rows.map(row =>
            row.id === id ? { ...row, Status: newStatus } : row
        );
        setRows(updatedRows);

        fetch(`http://localhost:5000/api/update_room_status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status_chambre: newStatus })
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to update status");
            return res.json();
        })
        .then(data => console.log("Status updated:", data))
        .catch(error => console.error("Error updating status:", error));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, isPrimaryKey: true, headerAlign: 'center', blueGrey },
        { field: 'Chambres', headerName: 'Chambres', width: 130, editable: false },
        { field: 'Résidents', headerName: 'Résidents', width: 250, editable: false },
        {
            field: 'Résident Actuel',
            headerName: 'Résident Actuel',
            type: 'string',
            width: 250,
            editable: false,
        },
        {
            field: 'Status',
            headerName: 'Status',
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <select
                    value={params.row.Status}
                    onChange={(e) => handleStatusChange(e, params.row.id)}
                >
                    <option value="Occupée">Occupée</option>
                    <option value="Vide">Vide</option>
                    <option value="Réparation">Réparation</option>
                </select>
            )
        },
    ];

    const filteredRows = rows.filter(row => {
        const search = searchText.toLowerCase();
        return (
            row.Chambres.toLowerCase().includes(search) ||
            row.Résidents.toLowerCase().includes(search) ||
            row["Résident Actuel"].toLowerCase().includes(search) ||
            row.Status.toLowerCase().includes(search)
        );
    });

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
                    <div className="flex-row-search-and-export">
                        <span className="table-name-title">Liste des chambres</span>
                        <button className="export-document-button">Exporter le document</button>
                    </div>
                </div>
                <div id="chambres-table-container">
                    <Paper sx={{ height: 400, width: '95%' }}>
                        <DataGrid
                            rows={filteredRows}
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
    );
}

export default ChambresCBase;
