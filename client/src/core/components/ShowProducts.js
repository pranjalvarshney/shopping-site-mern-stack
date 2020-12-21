import React from "react"
import { useHistory } from "react-router-dom"
import {
  Button,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core"
import { API } from "../../utils/backend"
import { ImageLoading } from "./ImageLoading"

export const ShowProducts = ({ products }) => {
  const history = useHistory()
  const getGridListCols = () => {
    const value = window.innerWidth > 768 ? 5 : 2
    return value
  }
  const getGridListRows = () => {
    const value = window.innerWidth > 768 ? 200 : 180
    return value
  }
  return (
    <div className="products-section container mt-3">
      <Grid
        className="mb-3"
        container
        justify="space-between"
        alignItems="center"
      >
        <Button variant="text" size="large">
          Trending gifts
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            history.push("/products")
          }}
        >
          Explore more
        </Button>
      </Grid>

      <GridList
        spacing={6}
        cols={getGridListCols()}
        cellHeight={getGridListRows()}
      >
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
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item>
                        <Typography variant="subtitle2">
                          <b>{product.name.slice(0, 20)}</b>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          {product.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </GridListTile>
            )
          })
        ) : (

          <img src="loading.gif" alt="loading"/>
)}
      </GridList>
    </div>
  )
}
