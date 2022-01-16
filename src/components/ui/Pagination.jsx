import React, { useState } from "react"
import PropTypes from "prop-types"

function Pagination({ currentPage, prevPage, nextPage, handlePageChange }) {
  const handleNextPage = () => {
    console.log(currentPage)
    handlePageChange(currentPage + 1)
  }
  const handlePrevPage = () => {
    handlePageChange(currentPage - 1)
  }
  return (
    <nav aria-label="pagination">
      <ul className="pagination justify-content-center">
        <li className={prevPage !== 0 ? "page-item" : "page-item disabled"}>
          <button
            type="button"
            aria-label="Previous"
            className="page-link"
            tabIndex={prevPage === 0 ? -1 : 0}
            onClick={() => handlePrevPage(prevPage - 1)}
          >
            Previous
          </button>
        </li>
        <li className={nextPage !== 0 ? "page-item" : "page-item disabled"}>
          <button
            type="button"
            aria-label="Next"
            className="page-link"
            tabIndex={prevPage === 0 ? -1 : 0}
            onClick={() => handleNextPage(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  prevPage: PropTypes.number.isRequired,
  nextPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

export default Pagination
