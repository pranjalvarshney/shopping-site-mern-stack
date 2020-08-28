import React from "react"
import { ImageLoading } from "../components/ImageLoading"

export const CartItem = ({ item }) => {
  return (
    <div>
      <div className='card my-3'>
        <div className='row'>
          <div className='col-3'>
            <ImageLoading />
          </div>
          <div className='col-7'>
            <div className='card-body'>
              <h5 className='card-title'>Card title</h5>
              <h6 className='card-subtitle mb-2 text-muted'>Card subtitle</h6>
              <p className='card-text'>$ 49</p>
              <a href='#' className='card-link'>
                <small> Add to wishlist</small>
              </a>
              <a href='#' className='card-link'>
                <small>Remove</small>
              </a>
            </div>
          </div>
          <div className='col-2'></div>
        </div>
      </div>
    </div>
  )
}
