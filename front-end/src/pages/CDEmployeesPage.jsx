import React from 'react';
import Header from '../components/ChefDepart/Header';
import EmployeeTable from '../components/ChefDepart/EmployeeTable';
import Pagination from '../components/ChefDepart/Pagination';
import Sidebar from '../components/ChefDepart/Sidebar';

const EmployeesPage = () => {
  // Sample data - in a real app, this would come from an API
  const employees = [
    {
      id: '2341421',
      name: 'Ahmed Rashdan',
      role: 'Help Desk Executive',
      department: 'IT Department',
      hireDate: '15 Aoul 2003',
      residence: 'Alger'
    },
    {
      id: '3411421',
      name: 'Ali Alhamdan',
      role: 'Senior Executive',
      department: 'Marketing',
      hireDate: '15 Aoul 2003',
      residence: 'Alger'
    },
    {
      id: '2341121',
      name: 'Mona Alghafar',
      role: 'Senior Manager',
      department: 'Design',
      hireDate: '15 Aoul 2003',
      residence: 'Alger'
    },
    {
      id: '2341421',
      name: 'Moustafa Adel',
      role: 'Director',
      department: 'Development',
      hireDate: '15 Aoul 2003',
      residence: 'Alger'
    },
    {
      id: '2341421',
      name: 'Jihan Nelesan',
      role: 'Director',
      department: 'Sales',
      hireDate: '15 Aoul 2003',
      residence: 'Alger'
    },
    {
      id: '2341421',
      name: 'Kadi Manela',
      role: 'System coordinator',
      department: 'IT Department',
      hireDate: '15 Aoul 2003',
      residence: 'Alger'
    }
  ];

  const currentPage = 1;
  const totalPages = 100;

  return (
  <div className="employees-page">
        <EmployeeTable employees={employees} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
  </div>

  );
};

export default EmployeesPage;