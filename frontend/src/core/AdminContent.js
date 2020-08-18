import React from "react"
import { Base } from "./Base"
import { AdminSidebar } from "./AdminSidebar"

export const AdminContent = ({ children }) => {
  return (
    <Base className={"container"}>
      <div className='row mt-5'>
        <div className='col-lg-3'>
          <AdminSidebar />
        </div>
        <div className='col-lg-9 card p-3'>{children}</div>
      </div>
    </Base>
  )
}
