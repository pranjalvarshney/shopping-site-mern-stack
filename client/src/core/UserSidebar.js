import { Button } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router-dom"
import {  signout } from "../auth/helper"

export const UserSidebar = () => {
  const history = useHistory()
  return (
    <div className="card text-left ">
      <h6 className="card-header px-4 bg-primary text-white border-0">
        User Dashboard
      </h6>
      <ul className="list-group">
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/user")
              window.location.reload()
            }}
            className="nav-link"
          >
            Profile
          </Button>
        </li>
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              history.push("/user/transactions")
              window.location.reload()
            }}
            className="nav-link"
          >
            Transactions
          </Button>
        </li>
        <li className="list-group-item py-2 my-0 border-0">
          <Button
            onClick={() => {
              signout(() => {
                history.push("/")
              })
            }}
            className="nav-link"
          >
            Signout
          </Button>
        </li>
      </ul>
    </div>
  )
}
