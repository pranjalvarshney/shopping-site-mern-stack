import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Base } from "../core/Base"
import { ImageLoading } from "../core/components/ImageLoading"
import { getProducts } from "../core/helper/mainAPICalls"
import { API } from "../utils/backend"

export const AllProducts = () => {
  const history = useHistory()
  const [allproducts, setAllproducts] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getProducts()
      if (response) {
        setAllproducts(response)
        setLoading(false)
      }
      console.log(response)
    } catch (error) {}
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  const getGridListCols = () => {
    const value = window.innerWidth > 768 ? 5 : 2
    return value
  }
  const getGridListRows = () => {
    const value = window.innerWidth > 768 ? 200 : 180
    return value
  }
  const showLoading = () => (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        role="status"
        style={{ display: loading ? "" : "none" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  return (
    <Base className="pt-5 container">
      <div className="pt-5 my-3">
        <Typography variant="h5" color="textPrimary" className="py-3">
          Trending gifts
        </Typography>
      </div>
      {loading && showLoading() }
      <GridList spacing={6} cols={getGridListCols()} cellHeight={getGridListRows()}>
        {loading ? null : allproducts.length > 0 ? (
          allproducts.map((pro, i) => {
            return (
              <GridListTile
                onClick={() => {
                  history.push(`/product/${pro._id}`)
                }}
                key={i}
              >
                <ImageLoading imgUrl={`${API}/product/photo/${pro._id}`} />
                <GridListTileBar
                  title={
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item>
                        <Typography variant="subtitle2">
                          <b>{pro.name.slice(0, 20)}</b>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">{pro.price}</Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </GridListTile>
            )
          })
        ) : (
          <Typography>No products in the database</Typography>
        )}
      </GridList>
    </Base>
  )
}
