import React from 'react';
import RequestTable from '../components/ChefDepart/RequestTable';
import Pagination from '../components/ChefDepart/Pagination';

const RequestsPage = () => {
  const currentPage = 1;
  const totalPages = 50;

  return (
    <div className="requests-page">
        <RequestTable />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default RequestsPage;
