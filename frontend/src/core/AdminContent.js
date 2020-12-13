import React from "react"
import { Base } from "./Base"
import { AdminSidebar } from "./AdminSidebar"

export const AdminContent = ({ children }) => {
  return (
    <Base className="container pt-5">
      <div className='row pt-5 my-5'>
        <div className='col-lg-3'>
          <AdminSidebar />
        </div>
        <div className='col-lg-9 card p-3'>{children}</div>
      </div>
    </Base>
  )
}
