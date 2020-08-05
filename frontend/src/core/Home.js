import React from "react"
import { Base } from "./Base"

export const Home = () => {
  console.log(process.env.REACT_APP_BACKEND)
  return (
    <Base>
      <h1>Home Page</h1>
    </Base>
  )
}
