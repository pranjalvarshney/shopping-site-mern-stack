import React from "react"
import { isAuthenticated } from "../../auth/helper"
import { emptyCart, loadCart } from "../helper/addToCartHelper"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { API } from "../../utils/backend"
import { createOrder } from "../helper/orderHelper"

export const StripeCheckOutForm = ({setSuccess,setSuccessInfo}) => {
  const calculateTPrice = () => {
    let tprice = 0
    loadCart().map((item) => {
      return (tprice = item.price + tprice)
    })
    return tprice
  }
  const token_auth = isAuthenticated() && isAuthenticated().data.token
  const userId = isAuthenticated() && isAuthenticated().data.user._id

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
      // console.log(response)
      if (response.status === 200) {
        let orderData = {
          products: loadCart(),
          transaction_id: response.data.id,
          amount: response.data.amount/100
        } 
        createOrder(userId,token_auth,orderData)
        setSuccess(true)
        setSuccessInfo(response.data)
        emptyCart()
      }
      return response
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <div>
      <StripeCheckout
        stripeKey="pk_key"
        token={makePayment}
        email={isAuthenticated().data.user.email}
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
