import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPages = () => {
    let pages = [];

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage, "...", totalPages];
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        className={`w-11 h-11 flex items-center justify-center rounded-sm text-lg font-medium transition-colors 
          ${currentPage === page ? "bg-sky-600 text-white" : "bg-white text-gray-900"} 
          ${typeof page !== "number" ? "cursor-default border border-dashed border-sky-900" : "hover:bg-sky-600 hover:text-white"}`}
        onClick={() => typeof page === "number" && onPageChange(page)}
        disabled={typeof page !== "number"}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 w-full py-2">

      <button
        className={`flex items-center gap-2 px-3 py-2 text-sm border border-gray-900 rounded-sm transition-colors
          ${currentPage === 1 ? "opacity-45 cursor-not-allowed" : "hover:bg-sky-900 hover:text-white"}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BsArrowLeft /> Previous
      </button>


      <div className="flex items-center justify-center gap-3">
        {renderPages()}
      </div>


      <button
        className={`flex items-center gap-2 px-3 py-2 text-sm border border-sky-900 rounded-sm transition-colors
          ${currentPage === totalPages ? "opacity-45 cursor-not-allowed" : "hover:bg-sky-900 hover:text-white"}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <BsArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
