import React from "react"
import { Base } from "../core/Base"
import { AddressCard } from "../core/card/AddressCard"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { StripeCheckOutForm } from "../core/card/StripeCheckOutForm"
const stripePromise = loadStripe("pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG")

export const Payment = () => {
  return (
    <Base className='container pt-5'>
      <h4 className='my-5 pt-5'>Payment Page</h4>
      <div className='row'>
        <div className='col-lg-5'>
          <AddressCard />
        </div>
        <div className='col-lg-7'>
          <h5>Pay to confirm</h5>
          <Elements stripe={stripePromise}>
            <StripeCheckOutForm />
          </Elements>
        </div>
      </div>
    </Base>
  )
}
