import React from "react"
import { isAuthenticated } from "../../auth/helper"
import { loadCart } from "../helper/addToCartHelper"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { API } from "../../utils/backend"

export const StripeCheckOutForm = () => {
  const calculateTPrice = () => {
    let tprice = 0
    loadCart().map((item) => {
      return (tprice = item.price + tprice)
    })
    return tprice
  }
  // const token = isAuthenticated() && isAuthenticated().data.token
  // const userId = isAuthenticated() && isAuthenticated().data.user._id

  const makePayment = async (token) => {
    const body = { token, products: loadCart() }
    const headers = {
      "Content-Type": "application/json",
    }
    try {
      const response = await axios.post(
        `${API}/stripepayment`,
        JSON.stringify(body),
        { headers }
      )
      console.log(response)
      return response
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51HMkntCxS9AVpG8j9uhE5ySPCBRhmivv5EmybqcYT9umwzO8qHNTHC6nljG9vOCajNtLtz2PcGwvGgbkMoQl5AZ000tNxgnXPP"
        token={makePayment}
        email= {isAuthenticated().data.user.email}
        amount={calculateTPrice() * 100}
        currency="INR"
        name="Pay to Wrap & go"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-warning float-right shadow">
          Complete payment
        </button>
      </StripeCheckout>
    </div>
  )
}
