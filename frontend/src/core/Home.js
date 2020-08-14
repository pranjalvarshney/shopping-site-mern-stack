import React from "react"
import { Base } from "./Base"
import { isAuthenticated } from "../auth/helper"

export const Home = () => {
  console.log(process.env.REACT_APP_BACKEND)
  return (
    <Base>
      <h1>Home Page</h1>
      {isAuthenticated() && <div>{isAuthenticated().data.user.name}</div>}
    </Base>
  )
}
