import React, { Fragment } from "react"
import { Link, withRouter, Redirect } from "react-router-dom"
import { isAuthenticated, signout } from "../auth/helper"

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
      <nav className='navbar navbar-dark navbar-expand-lg bg-dark py-3 px-5'>
        <Link className='navbar-brand' to='/'>
          <h3>BuyTees</h3>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active'>
              <Link
                style={currentTab(history, "/")}
                className='nav-link'
                to='/'
              >
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                style={currentTab(history, "/cart")}
                className='nav-link'
                to='#'
              >
                Cart
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                style={currentTab(history, "/account")}
                className='nav-link'
                to='#'
              >
                Account
              </Link>
            </li>
            {!isAuthenticated() && (
              <Fragment>
                <li className='nav-item'>
                  <Link
                    style={currentTab(history, "/signup")}
                    className='nav-link'
                    to='/signup'
                  >
                    Signup
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    style={currentTab(history, "/signin")}
                    className='nav-link'
                    to='/signin'
                  >
                    Signin
                  </Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated() && (
              <li className='nav-item'>
                <span
                  className='nav-link'
                  onClick={() => {
                    signout(() => {
                      history.push("/")
                    })
                  }}
                >
                  Signout
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
