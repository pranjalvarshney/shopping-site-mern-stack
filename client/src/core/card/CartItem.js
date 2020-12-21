import React from "react"
import { ImageLoading } from "../components/ImageLoading"
import { API } from "../../utils/backend"

export const CartItem = ({ item, removeFromCartFunc, addToWishListFunc }) => {
  return (
    <div>
      <div className='card my-3 shadow border-0'>
        <div className='row px-3'>
          <div className='col-3 m-auto'>
            <ImageLoading
              imgUrl={`${API}/product/photo/${item._id}`}
              // height={"100%"}
              // width={"100%"}
            />
          </div>
          <div className='col-6 pl-0'>
            <div className='card-body'>
              <h5 className='card-title'>{item.name.slice(0, 20)}</h5>
              <h6 className='card-subtitle mb-2 text-muted'>
                <small style={{ fontSize: "11px" }}>PId: {item._id}</small>
              </h6>
              <p className='card-text h5'>Rs. {item.price}</p>
              <span
                className='card-link'
                onClick={() => addToWishListFunc(item)}
              >
                <small> Add to wishlist</small>
              </span>
              <span
                className='card-link'
                onClick={() => removeFromCartFunc(item)}
              >
                <small>Remove</small>
              </span>
            </div>
          </div>
          <div className='col-3 mx-auto mt-3'>
            <small className='text-muted' style={{ fontSize: "12px" }}>
              7 Days Replacement Policy
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}
