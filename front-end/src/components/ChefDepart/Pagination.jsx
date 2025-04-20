import React from 'react';
import '../../style/CDPagination.css';

const Pagination = ({ currentPage, totalPages }) => {
  return (
    <div className="pagination">
      <span>Page {currentPage} of {totalPages}</span>
    </div>
  );
};

export default Pagination;