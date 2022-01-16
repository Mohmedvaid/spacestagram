import React from "react"
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <header className="mb-5 sticky-top border-bottom border-dark ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-5 ">
        <a className="navbar-brand" href="/spacestagram">
          SPACESTAGRAM
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/spacestagram" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/favorite" className="nav-link">
                Favorite Images
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
