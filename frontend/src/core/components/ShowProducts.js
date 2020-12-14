import React from "react"
import { useHistory } from "react-router-dom"
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core"
import { API } from "../../utils/backend"
import { ImageLoading } from "./ImageLoading"

export const ShowProducts = ({ products }) => {
  const history = useHistory()
  return (
    <div className="products-section container mt-3">
      <div className="row container justify-content-between mb-3">
        <h4>Trending gifts</h4>
        <h6>Explore more</h6>
      </div>
      <GridList cols={5}>
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <GridListTile
                key={index}
                onClick={() => {
                  history.push(`/product/${product._id}`)
                }}
              >
                <ImageLoading imgUrl={`${API}/product/photo/${product._id}`} />
                <GridListTileBar
                  title={
                    <Grid container justify="space-between">
                      <Grid item>{product.name}</Grid>
                      <Grid item>{product.price}</Grid>
                    </Grid>
                  }
                />
              </GridListTile>
            )
          })
        ) : (
          <div>loading</div>
        )}
      </GridList>
      {/* <div className='products-wrapper'>
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
      </div> */}
    </div>
  )
}
