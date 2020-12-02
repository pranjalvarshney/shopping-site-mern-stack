import React, { Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import { isAuthenticated, signout } from "../auth/helper"
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone"
import SearchIcon from "@material-ui/icons/Search"

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "orange", fontWeight: "bold" }
  } else {
    return { color: "white" }
  }
}

const Navbar = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark py-3  main-navbar">
          <div className=" container">
          <Link className='navbar-brand' to='/'>
            <h2 className='brandName'>Wrap & go</h2>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarToggler'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className="collapse navbar-collapse ">
          <ul className='navbar-nav ml-auto ' style={{alignItems:"center"}}>
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
              {/* <span className='nav-link text-white h6'>
                <SearchIcon style={{ color: "white", fontSize: "30px" }} />
                Search
              </span> */}
              {/* {
                isAuthenticated ? <li>
                <Link
                  style={currentTab(history, "/profile")}
                  className='nav-link'
                  to='/profile'
                >
                  <span className='text-white h6 mx-3'>
                    <AccountCircleIcon
                      style={{ color: "white", fontSize: "30px" }}
                    />
                    Profile
                  </span>
                </Link>
              </li> : null
              } */}
              <li className='nav-item h6'>
                <Link
                  style={currentTab(history, "/cart")}
                  className='nav-link'
                  to='/cart'
                >
                  <span className='text-white h6'>
                    <ShoppingCartTwoToneIcon
                      style={{ color: "white", fontSize: "32px" }}
                    />
                    Cart
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          </div>
    </nav>
     
  )
}

export default withRouter(Navbar)
