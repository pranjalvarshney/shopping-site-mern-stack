import React from "react"
import { ProductCard } from "../card/ProductCard"

export const ShowProducts = ({ products }) => {
  console.log(products)
  return (
    <div className='products-section container mt-4'>
      <h4>Trending gifts</h4>
      <div className='products-wrapper'>
        {products.length > 0 ? (
          products.map((product, index) => {
            return <ProductCard key={index} product={product} />
          })
        ) : (
          <div>loading</div>
        )}
      </div>
    </div>
  )
}
