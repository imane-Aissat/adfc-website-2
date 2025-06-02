import React, { useEffect, useState } from 'react';
import Header from '../components/ChefDepart/Header';
import EmployeeTable from '../components/ChefDepart/EmployeeTable';
import Pagination from '../components/ChefDepart/Pagination';
import Sidebar from '../components/ChefDepart/Sidebar';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/api/employees'
          : '/api/employees';

        const response = await fetch(`${apiUrl}?page=${currentPage}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || !Array.isArray(data.employees)) {
          throw new Error('Invalid data structure received from server');
        }

        // Transform data to ensure consistent structure
        const formattedEmployees = data.employees.map(emp => ({
          id: emp.id,
          name: emp.name || 'No Name',
          role: emp.role || 'No Role',
          email: emp.email || 'No Email',
          status: emp.status || 'Unknown'
        }));

        setEmployees(formattedEmployees);
        setTotalPages(data.totalPages || 1);
        
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message || 'Failed to load employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        Error: {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="employees-page">
      <Header />
      <Sidebar />
      <EmployeeTable employees={employees} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EmployeesPage;