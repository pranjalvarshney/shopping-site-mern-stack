import React from "react"
import { API } from "../../utils/backend"

export const ProductCard = ({ product }) => {
  return (
    <div>
      <div className='product-card card'>
        <img
          className='card-img-top'
          src={`${API}/product/photo/${product._id}`}
          height='200'
          width='150'
          alt='cap'
        />
        <div className='mt-1 px-3 product-brief'>
          <span>
            <h6 className='card-title'>{product.name}</h6>
          </span>
          <span>
            <h6>{product.price}</h6>
          </span>
        </div>
      </div>
    </div>
  )
}
