import React from "react"
import { Base } from "../core/Base"
import { AddressCard } from "../core/card/AddressCard"

export const Payment = () => {
  return (
    <Base className='container my-3'>
      <h4 className='my-3'>Payment Page</h4>
      <div className='col-lg-5'>
        <AddressCard />
      </div>
    </Base>
  )
}
