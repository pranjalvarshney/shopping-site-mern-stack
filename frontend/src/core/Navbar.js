import React, { Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import { isAuthenticated, signout } from "../auth/helper"
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import SearchIcon from "@material-ui/icons/Search"

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
      <nav className='navbar navbar-dark navbar-expand-lg py-3 px-5 shadow main-navbar'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            <h2 className='brandName'>Cute Teddy</h2>
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
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item h6 active'>
                <Link
                  style={currentTab(history, "/")}
                  className='nav-link'
                  to='/'
                >
                  Home
                </Link>
              </li>

              <li className='nav-item h6'>
                <Link
                  style={currentTab(history, "/blogs")}
                  className='nav-link'
                  to='/blogs'
                >
                  Blogs
                </Link>
              </li>
              <li className='nav-item h6'>
                <Link
                  style={currentTab(history, "/occasions")}
                  className='nav-link'
                  to='/occasions'
                >
                  Occasions
                </Link>
              </li>
              {isAuthenticated() && isAuthenticated().data.user.role === 0 && (
                <li className='nav-item h6'>
                  <Link
                    style={currentTab(history, "/user")}
                    className='nav-link'
                    to='/user'
                  >
                    Hey,
                    {isAuthenticated() && (
                      <span> {isAuthenticated().data.user.name}</span>
                    )}
                  </Link>
                </li>
              )}
              {isAuthenticated() && isAuthenticated().data.user.role === 1 && (
                <li className='nav-item h6'>
                  <Link
                    style={currentTab(history, "/admin")}
                    className='nav-link'
                    to='/admin'
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              {!isAuthenticated() && (
                <Fragment>
                  <li className='nav-item h6'>
                    <Link
                      style={currentTab(history, "/signup")}
                      className='nav-link'
                      to='/signup'
                    >
                      Signup
                    </Link>
                  </li>
                  <li className='nav-item h6'>
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
                <li className='nav-item h6'>
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
            <ul className='navbar-nav ml-auto'>
              <span className='nav-link text-white h6'>
                {" "}
                <SearchIcon style={{ color: "white", fontSize: "30px" }} />
                Search
              </span>
              <li>
                <Link
                  style={currentTab(history, "/profile")}
                  className='nav-link'
                  to='/profile'
                >
                  <span className='text-white h6 mx-3'>
                    <AccountCircleIcon
                      style={{ color: "white", fontSize: "30px" }}
                    />{" "}
                    Profile
                  </span>
                </Link>
              </li>
              <li className='nav-item h6'>
                <Link
                  style={currentTab(history, "/cart")}
                  className='nav-link'
                  to='/cart'
                >
                  <span className='text-white h6'>
                    <ShoppingCartTwoToneIcon
                      style={{ color: "white", fontSize: "30px" }}
                    />{" "}
                    Cart
                  </span>
                </Link>
              </li>
              {/* <span className='text-white h6 '>Signin</span> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Navbar)
