import React, { useState, useEffect } from "react"
import { Base } from "../core/Base"
import { CartItem } from "../core/card/CartItem"
import { TotalCart } from "../core/card/TotalCart"
import { loadCart, removeFromCart } from "../core/helper/addToCartHelper"
import { useHistory, Link } from "react-router-dom"
import { addToWishList } from "../core/helper/wishlistHelper"
import { isAuthenticated } from "../auth/helper"
import { StripeCheckOutForm } from "../core/card/StripeCheckOutForm"
import { PaymentSuccess } from "./PaymentSuccess"

export const Cart = () => {
  const [success, setSuccess] = useState(false)
  const [successInfo, setSuccessInfo] = useState()
  const [cartdata, setCartdata] = useState([])
  const history = useHistory()

  const addToWishListFunc = (item) => {
    addToWishList(item)
    setCartdata(loadCart())
  }

  const removeFromCartFunc = (id) => {
    removeFromCart(id)
    setCartdata(loadCart())
  }

  useEffect(() => {
    setCartdata(loadCart())
  }, [])
  // console.log(success)
  // console.log(successInfo)
  return (
    <Base className="container pt-5 ">
      {!success ? <div className="row my-5 pt-5">
        <div className="col-lg-7 jumbotron py-3 m-2">
          <h5>
            My Cart (<span className="h5 px-1">{cartdata.length}</span>)
          </h5>
          {cartdata.length > 0 ? (
            <>
              {cartdata.map((item, i) => {
                return (
                  <CartItem
                    key={i}
                    item={item}
                    removeFromCartFunc={removeFromCartFunc}
                    addToWishListFunc={addToWishListFunc}
                  />
                )
              })}
            </>
          ) : (
            <div className="card m-auto w-50 border-0 py-3">
              <h5 className="text-center my-3">Your cart is Empty</h5>
              <span
                className="badge badge-primary p-3 m-auto"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/")
                }}
              >
                Continue shopping
              </span>
            </div>
          )}
        </div>
        <div className="col-lg-4 jumbotron py-3 m-2">
          <TotalCart cartData={cartdata} />
          <div className="float-right mt-3">
            {isAuthenticated() ? (
              <StripeCheckOutForm setSuccess={setSuccess} setSuccessInfo={setSuccessInfo}/>
            ) : (
              <Link to="/signin">
                <button
                  type="submit"
                  className="btn btn-danger float-right shadow"
                >
                  Signin to Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>: <PaymentSuccess successInfo={successInfo}/> }
    </Base>
  )
}
