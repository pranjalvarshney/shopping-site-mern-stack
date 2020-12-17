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
    const value =  window.innerWidth > 768 ? 5 : 2
    // console.log(value)
    return value
  }
  const getGridListRows = () => {
    const value =  window.innerWidth > 768 ? 260 : 240
    // console.log(value)
    return value
  }
  return (
    <div className="products-section container mt-3">
      <Grid className="mb-3" container justify="space-between" alignItems="center">
        <Typography variant="h6">Trending gifts</Typography>
        <Button variant="text" size="small" onClick={()=>{
          history.push("/products")
        }}>Explore more</Button>
      </Grid>

      <GridList spacing={3} cols={getGridListCols()} cellHeight={getGridListRows()}>
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
                      <Grid item><Typography variant="subtitle2"><b>{product.name.slice(0,20)}</b></Typography></Grid>
                      <Grid item ><Typography variant="subtitle2">{product.price}</Typography></Grid>
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
    </div>
  )
}
