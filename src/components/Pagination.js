import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPaginationButtons = () => {
    const visiblePages = 9; // Number of pages to display

    if (totalPages <= visiblePages) {
      // Display all pages if total pages are less than or equal to the visible pages
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      // Display 9 pages and ".." before the last page
      const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
      const endPage = Math.min(totalPages, startPage + visiblePages - 1);

      const pagesToDisplay = [];
      for (let i = startPage; i <= endPage; i++) {
        pagesToDisplay.push(i);
      }

      if (startPage > 1) {
        // Add ".." before the last page if the startPage is greater than 1
        pagesToDisplay.unshift('..');
      }

      if (endPage < totalPages) {
        // Add the last page if the endPage is less than totalPages
        pagesToDisplay.push(totalPages);
      }

      return pagesToDisplay;
    }
  };

  return (
    <div>
      {renderPaginationButtons().map((page, index) => (
        <button
          className='btn circular mx-1'
          key={index}
          onClick={() => handlePageChange(page)}
          disabled={typeof page === 'number' && page === currentPage}
        >
          {page === '..' ? (
            <span>..</span>
          ) : (
            <span>{page}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
