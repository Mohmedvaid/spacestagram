import React from "react"
import PropTypes from "prop-types"

function Pagination({ currentPage, prevPage, nextPage, handlePageChange }) {
  if (prevPage === 0 && nextPage === 0) return null

  /**
   * adds 1 to the current page number and calls handlePageChange
   */
  const handleNextPage = () => {
    handlePageChange(currentPage + 1)
  }
  /**
   * deducts 1 from the currentPage and calls handlePageChange
   */
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
