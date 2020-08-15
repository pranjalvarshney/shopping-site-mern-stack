import React from "react"
import { Base } from "../core/Base"
import { isAuthenticated } from "../auth/helper"
import { Link } from "react-router-dom"
import { AdminSidebar } from "../core/AdminSidebar"

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
  return (
    <Base>
      <div className='row mt-5'>
        <div className='col-lg-3'>
          <AdminSidebar />
        </div>
        <div className='col-lg-9'>{contentArea()}</div>
      </div>
    </Base>
  )
}
