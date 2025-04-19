import React from 'react';
import '../../style/SuperAdminStyles/SuperAdminFilteringFields.css';

const SuperAdminFilteringFields = () => {
  return (
    <div className="superadmin-filteringfield-container">
      <div className="superadmin-filteringfield-group">
        <label>Nom de l'employé</label>
        <input type="text" placeholder="Enter Employee Name" />
      </div>
      <div className="superadmin-filteringfield-group">
        <label>Poste</label>
        <input type="text" placeholder="Enter Role" />
      </div>
      <div className="superadmin-filteringfield-group">
        <label>Département</label>
        <input type="text" placeholder="Start Department" />
      </div>
      <div className="superadmin-filteringfield-group">
        <label>ID</label>
        <input type="text" placeholder="Enter ID" />
      </div>
    </div>
  );
};

export default SuperAdminFilteringFields;
