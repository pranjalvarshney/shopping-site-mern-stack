import React from "react"
import { Base } from "../core/Base"
import { isAuthenticated } from "../auth/helper"
import { Link } from "react-router-dom"

export const AdminDashboard = () => {
  const { name, email, role } = isAuthenticated().data.user

  const contentArea = () => {
    return (
      <div className='card p-3'>
        <h3>Welcome admin,</h3>
        <h6>You can manage and control the entire system</h6>
        <div className='container'>
          <h6>Admin Info</h6>
          <ul className='list-group'>
            <li className='list-group-item border-0 py-1'>
              <span className='badge badge-primary mr-2 px-2 py-1'>Name </span>{" "}
              {name}
            </li>
            <li className='list-group-item border-0 py-1'>
              <span className='badge badge-primary mr-2 px-2 py-1'>Email </span>{" "}
              {email}
            </li>
            <li className='list-group-item border-0 py-1'>
              <span className='badge badge-primary mr-2 px-2 py-1'>Work </span>{" "}
              Admin
            </li>
          </ul>
        </div>
      </div>
    )
  }
  const sideBar = () => {
    return (
      <div className='card text-left '>
        <h6 className='card-header px-4'>Admin Navigation</h6>
        <ul className='list-group'>
          <li className='list-group-item py-1 my-0 border-0'>
            <Link to='/admin/create/category' className='nav-link'>
              Create Category
            </Link>
          </li>
          <li className='list-group-item py-1 my-0 border-0'>
            <Link to='/admin/create/product' className='nav-link'>
              Create Product
            </Link>
          </li>
          <li className='list-group-item py-1 my-0 border-0'>
            <Link to='/admin/create/category' className='nav-link'>
              Manage Products
            </Link>
          </li>
          <li className='list-group-item py-1 my-0 border-0'>
            <Link to='/admin/create/category' className='nav-link'>
              Manage Orders
            </Link>
          </li>
          <li className='list-group-item py-1 my-0 border-0'>
            <Link to='/admin/create/category' className='nav-link'>
              Manage Users
            </Link>
          </li>
        </ul>
      </div>
    )
  }
  return (
    <Base>
      <div className='row mt-5'>
        <div className='col-lg-3'>{sideBar()}</div>
        <div className='col-lg-9'>{contentArea()}</div>
      </div>
    </Base>
  )
}
