import React from "react"
import { Base } from "./Base"
import { isAuthenticated } from "../auth/helper"
import { SectionHello } from "./components/SectionHello"

export const Home = () => {
  console.log(process.env.REACT_APP_BACKEND)
  return (
    <Base>
      <div className='Home'>
        <div className='main-wrapper'>
          <SectionHello />
        </div>
      </div>
    </Base>
  )
}
