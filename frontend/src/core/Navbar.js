import React from "react"
import { Link, withRouter } from "react-router-dom"

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "white" }
  } else {
    return { color: "grey" }
  }
}

const Navbar = ({ history }) => {
  return (
    <div>
      <nav class='navbar navbar-dark navbar-expand-lg bg-dark py-3 px-5'>
        <Link class='navbar-brand' to='/'>
          <h3>BuyTees</h3>
        </Link>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>

        <div class='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul class='navbar-nav ml-auto'>
            <li class='nav-item active'>
              <Link style={currentTab(history, "/")} class='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li class='nav-item'>
              <Link
                style={currentTab(history, "/signup")}
                class='nav-link'
                to='/signup'
              >
                Signup
              </Link>
            </li>
            <li class='nav-item'>
              <Link
                style={currentTab(history, "/signin")}
                class='nav-link'
                to='/signin'
              >
                Signin
              </Link>
            </li>
            <li class='nav-item'>
              <Link
                style={currentTab(history, "/cart")}
                class='nav-link'
                to='#'
              >
                Cart
              </Link>
            </li>
            <li class='nav-item'>
              <Link
                style={currentTab(history, "/account")}
                class='nav-link'
                to='#'
              >
                Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
