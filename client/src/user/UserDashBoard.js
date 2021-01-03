import React from "react"
import { isAuthenticated } from "../auth/helper"
import { Base } from "../core/Base"
import { UserSidebar } from "../core/UserSidebar"

export const UserDashboard = () => {
  const { name, email } = isAuthenticated().data.user

  const contentArea = () => {
    return (
      <div className='card p-3'>
        <h3>Welcome </h3>
        <h6>You can view your profile and orders</h6>
        <div className='container'>
          <h6>User Info</h6>
          <ul className='list-group'>
            <li className='list-group-item border-0 py-1'>
              <span className='badge badge-primary mr-2 px-2 py-1'>Name </span>
              {name}
            </li>
            <li className='list-group-item border-0 py-1'>
              <span className='badge badge-primary mr-2 px-2 py-1'>Email </span>
              {email}
            </li>
            <li className='list-group-item border-0 py-1'>
              <span className='badge badge-primary mr-2 px-2 py-1'>Work </span>
              User
            </li>
          </ul>
        </div>
      </div>
    )
  }
  return (
    <Base className="container py-5">
      <div className="row my-5 pt-5">
      <div className='col-lg-3'>
          <UserSidebar />
        </div>
        <div className='col-lg-9'>{contentArea()}</div>
      </div>
    </Base>
  )
}
