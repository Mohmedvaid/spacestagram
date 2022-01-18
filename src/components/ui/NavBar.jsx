import React from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../../img/logo.svg"

const paths = {
  home: "/spacestagram",
  favorite: "/favorite",
}
function NavBar() {
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <header className="mb-5 sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
        <a className="navbar-brand" href="/spacestagram">
          <img src={logo} width={200} height={35} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobileNav"
          aria-controls="mobileNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mobileNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link
                to={paths.home}
                className={`nav-link ${
                  currentPath === paths.home ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={paths.favorite}
                className={`nav-link ${
                  currentPath === paths.favorite ? "active" : ""
                }`}
              >
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
