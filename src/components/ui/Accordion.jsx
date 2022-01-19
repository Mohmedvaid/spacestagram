import React from "react"
import PropTypes from "prop-types"

function Accordion({ id, title, description }) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="accordion py-2" id={`accordion${id}`}>
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#flush-collapse${id}`}
            aria-expanded="false"
            aria-controls="flush-collapseOne"
            onClick={() => setIsOpen(!isOpen)}
          >
            {title}
          </button>
        </h2>
        <div
          id={`flush-collapse${id}`}
          className={`accordion-body collapse ${isOpen ? "show" : ""}`}
          aria-labelledby="flush-headingOne"
          data-bs-parent={`#accordion${id}`}
        >
          <div className="accordion-body text-dark">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
Accordion.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Accordion
