import React from "react"
import { ProductCard } from "../card/ProductCard"
import { Link } from "react-router-dom"

export const ShowProducts = ({ products }) => {
  console.log(products)
  return (
    <div className='products-section container mt-4'>
      <h4>Trending gifts</h4>
      <div className='products-wrapper'>
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <Link key={index} to={`/product/${product._id}`}>
                <ProductCard product={product} />
              </Link>
            )
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  )
}
