import React, { useState } from "react"
import PropTypes from "prop-types"

function Search({ setSearchParams }) {
  const [endYear, setEndYear] = useState("")
  const [startYear, setStartYear] = useState("")
  const [query, setQuery] = useState("")
  const [textError, setTextError] = useState(false)

  const handleClick = () => {
    if (query === "") {
      setTextError(true)
    } else {
      setSearchParams({
        query,
        startYear,
        endYear,
      })
    }
  }

  return (
    <section className="container">
      <form
        className="row justify-content-center text-center"
        // className="d-flex justify-content-center"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className="col-12 mb-3">
          <label htmlFor="searchBox" className="max-width">
            Search
            <span className="text-danger bold" aria-label="required field">
              {" "}
              *
            </span>
            <input
              id="searchBox"
              type="text"
              className="form-control"
              placeholder="'stars', 'earth', 'apollo 11' etc"
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className={textError ? "invalid-val d-block" : "d-none"}>
            <b>Please provide a search term.</b>
          </div>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <label htmlFor="fromDate">
            From Date
            <input
              id="fromDate"
              type="text"
              className="form-control"
              placeholder="YYYY"
              onChange={(e) => setStartYear(e.target.value)}
            />
          </label>
        </div>
        <div className="col-6  d-flex justify-content-start">
          <label htmlFor="toDate">
            To Date
            <input
              id="toDate"
              type="text"
              className="form-control"
              placeholder="YYYY"
              onChange={(e) => setEndYear(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary search-btn m-3"
          onClick={(e) => handleClick(e)}
        >
          Search
        </button>
      </form>
    </section>
  )
}
Search.propTypes = {
  setSearchParams: PropTypes.func.isRequired,
}

export default Search
