import React from "react"
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser"

export const TotalCart = ({ cartData }) => {
  const calculateTPrice = () => {
    let tprice = 0
    cartData.map((item) => {
      return (tprice = item.price + tprice)
    })
    return tprice
  }
console.log(cartData)
  return (
    <div>
      <h5>Price Details</h5>
      <div className='card border-0 p-3 my-3'>
        <div className='row justify-content-between px-3 '>
          <h6>Price ({cartData.length})</h6>
          <h6>Rs. {calculateTPrice()}</h6>
        </div>
        <div className='row justify-content-between px-3 '>
          <h6>Delivery </h6>
          <h6 className='text-success'>Free</h6>
        </div>
        <hr />

        <div className='row justify-content-between px-3 '>
          <h5>Total Amount </h5>
          <h5 >Rs. {calculateTPrice()}</h5>
        </div>
      </div>
      <div className='container'>
        <VerifiedUserIcon style={{ color: "grey" }} />
        <small className='text-muted text-center'>
          Safe and Secure Payments. Easy returns. 100% Authentic products.
        </small>
      </div>
    </div>
  )
}
