import React from "react"
import { AddressCard } from "../core/card/AddressCard"

export const Payment = () => {
  return (
    <div className='container pt-5'>
      <h4 className='my-5 pt-5'>Payment Page</h4>
      
      <div className='row justify-content-s'>
        <div className='col-md-4'>
          <AddressCard />
        </div>
        <div className='col-md-4'>
          <h5>Pay to confirm</h5>
          
           
        </div>
      </div>
    </div>
  )
}
