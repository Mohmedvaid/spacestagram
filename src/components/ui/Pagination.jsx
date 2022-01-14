import React from "react"
import PropTypes from "prop-types"

function Pagination({ links }) {
  const prev = links.find((link) => link.rel === "prev")
  const next = links.find((link) => link.rel === "next")
  console.log(links)
  if (links.length === 0) return null
  //   console.log(prev)
  //   console.log(next)
  // TODO handle pagination click and update api url for pagination
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={prev ? "page-item" : "page-item disabled"}>
          <a className="page-link" href={prev ? prev.href : "#"} tabIndex="-1">
            Previous
          </a>
        </li>
        {/* <li className="page-item active">
          <a className="page-link" href="/">
            2 <span className="sr-only">(current)</span>
          </a>
        </li> */}
        <li className="page-item">
          <a className="page-link" href={next.href}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}
Pagination.propTypes = {
  links: PropTypes.instanceOf(Object).isRequired,
}

export default Pagination
