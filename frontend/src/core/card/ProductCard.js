import React from "react"
import API from "../../utils/backend"

export const ProductCard = ({ product }) => {
  return (
    <div>
      <div class='card' style='width: 18rem;'>
        <img
          class='card-img-top'
          src={`${API}/product/photo/${product._id}`}
          height='200'
          width='150'
          alt='Card image cap'
        />
        <div class='card-body'>
          <h5 class='card-title'>{product.name}</h5>
          <p class='card-text'>{product.price}</p>
          <a href='#' class='btn btn-primary'>
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  )
}
