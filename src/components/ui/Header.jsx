import React from "react"
import PropTypes from "prop-types"

function Header({ title }) {
  return (
    <header className="center d-flex flex-column">
      {/* <img width="100" height="150" src={logo} alt="spacestagram logo" /> */}
      <h1>{title}</h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
