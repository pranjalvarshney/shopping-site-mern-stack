import React from "react"
import { Link, useHistory, withRouter } from "react-router-dom"
import { isAuthenticated, signout } from "../auth/helper"
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone"
import { useState } from "react"
import { Button } from "@material-ui/core"

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black" ,textDecoration:"none"}
  } else {
    return { color: "white" ,textDecoration:"none"}
  }
}

const Navbar = ({ history }) => {
  
  const usehistory = useHistory()
  const [toggleMenu, setToggleMenu] = useState(false)
  
  const handleToggle = () => {
    console.log(toggleMenu)
    setToggleMenu(!toggleMenu)
  }

  return (
    <nav className="main-navbar">
      <Button id="brandName" className="main-navbar-brand ml-0" onClick={()=>{
        usehistory.push("/")
        window.location.reload()
      }}>
        <img src={"../../gift.png"} className="logo-brand" alt="logo"/>
        Wrap & go
      </Button>
      <div className="menu-toggle" id="mobile-menu" onClick={handleToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav no-search ${toggleMenu ? "mobile-nav" :""}`}>
        <li className="h6 nav-link active">
          <Link style={currentTab(history, "/")} to="/">
            Home
          </Link>
        </li>

        <li className="h6 nav-link">
          <Link style={currentTab(history, "/blogs")} to="/blogs">
            Blogs
          </Link>
        </li>
        <li className="h6 nav-link">
          <Link style={currentTab(history, "/occasions")} to="/occasions">
            Occasions
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().data.user.role === 1 && (
          <li className="h6 nav-link">
            <Link style={currentTab(history, "/admin")} to="/admin">
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().data.user.role === 0 && (
          <li className="h6 nav-link">
            <Link style={currentTab(history, "/user")} to="/user">
              Hey,
              {isAuthenticated() && (
                <span> {isAuthenticated().data.user.name}</span>
              )}
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <li className="h6 nav-link">
            <Link style={currentTab(history, "/signin")} to="/signin">
              Signin
            </Link>
          </li>
        )}
        {isAuthenticated() && (
          <li className="h6 nav-link">
            <Link to="/" style={{ color: "white" }}>
              
              <span
                onClick={() => {
                  signout(() => {
                    history.push("/")
                  })
                }}
              >
                Signout
              </span>
            </Link>
          </li>
        )}
        {/* <span className='nav-link text-white h6 nav-link'>
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
                  <span className='text-white h6 nav-link mx-3'>
                    <AccountCircleIcon
                      style={{ color: "white", fontSize: "30px" }}
                    />
                    Profile
                  </span>
                </Link>
              </li> : null
              } */}
        <li className="h6 nav-link">
          <Link style={currentTab(history, "/cart")}  to="/cart">
            <span className="m-auto text-white h6 nav-link" style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                <ShoppingCartTwoToneIcon
                  style={{ color: "white", fontSize: "32px" }}
                />
                Cart
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Navbar)
