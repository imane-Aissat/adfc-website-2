// RigEmployeesPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeTable from '../../components/EmployeeTable';
import "../../style/HRDashboard.css";
import Layout from '../../components/Layout';

const RigEmployeesPage = () => {
  const { rigId } = useParams();
  const [employees, setEmployees] = useState([]);

  // Fetch employees for this specific rig
  useEffect(() => {
    const fetchRigEmployees = async () => {
      try {
        
        setEmployees([
          {
            id: '2341421',
            name: 'Ahmed Rashdan',
            role: 'Rig Operator',
            department: 'Operations',
            hireDate: '15 Aout 2003',
            residence: 'Alger'
          },
          {
            id: '3411421',
            name: 'Ali Ahamdan',
            role: 'Safety Engineer',
            department: 'Safety',
            hireDate: '20 Mars 2022',
            residence: 'Alger'
          }
        ]);
      } catch (error) {
        console.error("Error fetching rig employees:", error);
      }
    };

    fetchRigEmployees();
  }, [rigId]);

  return (
    <Layout>
        <EmployeeTable 
      rigContext={rigId} 
      employeesData={employees} 
    />
    </Layout>
    
  );
};

export default RigEmployeesPage;