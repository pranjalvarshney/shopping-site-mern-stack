import React, { useState, useEffect } from "react"
import { Base } from "../core/Base"
import { CartItem } from "../core/card/CartItem"
import { TotalCart } from "../core/card/TotalCart"
import { loadCart } from "../core/helper/addToCartHelper"

export const Cart = () => {
  const [cartdata, setCartdata] = useState([])

  useEffect(() => {
    setCartdata(loadCart())
  }, [])
  console.log(cartdata)

  return (
    <Base className='container my-3 '>
      <div className='row m-auto'>
        <div className='col-lg-7 jumbotron py-3 m-2'>
          <h2>Cart</h2>
          {cartdata.map((item, i) => {
            return <CartItem key={i} item={item} />
          })}
        </div>
        <div className='col-lg-4 jumbotron py-3 m-2'>
          <TotalCart />
        </div>
      </div>
    </Base>
  )
}
