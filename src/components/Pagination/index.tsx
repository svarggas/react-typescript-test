import type { FC } from 'react';
import './style.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: number[] = [];
    const pagesEachSide = 2; // Show 2 pages on each side of current page
    const start = Math.max(1, currentPage - pagesEachSide);
    const end = Math.min(totalPages, currentPage + pagesEachSide);

    // Add pages based on the current page
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination">
      <button
        className="pagination-button pagination-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        aria-label="Previous page"
      >
        ←
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${
            page === currentPage ? 'pagination-current' : ''
          }`}
          onClick={() => onPageChange(page)}
          disabled={loading}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-button pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
