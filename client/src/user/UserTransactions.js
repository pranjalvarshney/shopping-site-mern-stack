import React, { useEffect, useState } from "react"
import { isAuthenticated } from "../auth/helper"
import { Base } from "../core/Base"
import { viewOrdersById } from "../core/helper/orderHelper"
import { UserSidebar } from "../core/UserSidebar"

export const UserTransactions = () => {
  const [allOrders, setAllOrders] = useState([])
  const fetchAllOrders =async () => {
      try {
          const response = await viewOrdersById(isAuthenticated().data.token)
          console.log(response)
          
      } catch (error) {
          console.log(error.response)
      }
  }
  useEffect(()=>{
    fetchAllOrders()
  },[])
    const contentArea = () => {
    return (
      <div className="card p-3">
        <h3>All Transactions</h3>
        <h6>Your orders and transactions </h6>
        <div className="container">
         {}
        </div>
      </div>
    )
  }

  return (
    <Base className="container py-5">
      <div className="row my-5 pt-5">
        <div className="col-lg-3">
          <UserSidebar />
        </div>
        <div className="col-lg-9">{contentArea()}</div>
      </div>
    </Base>
  )
}
