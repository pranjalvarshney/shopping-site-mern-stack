import { Grid, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Base } from "../core/Base"
import { getProducts } from "../core/helper/mainAPICalls"
import { ShowProducts } from "../core/components/ShowProducts"

export const OccasionType = ({ match }) => {
  const [products, setProducts] = useState(null)
  // const [errors, setErrors] = useState([])

  const loadData = async () => {
    try {
      const response = await getProducts()
      if (response) {
        setProducts(response)
        // setErrors("")
      }
    } catch (error) {
      // setErrors(error)
    }
  }

  const filterData = () => {
    if (products !== null) {
      // console.log(products)
      let arr = []
      products.map((prod) => {
        if (prod.occasions.includes(match.params.otype)) {
          arr.push(prod)
        }
        return 0
      })
      return <ShowProducts products={arr} />
    }
  }

  // console.log(products)
  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (products === null) {
    return (
      <div style={{ display: "grid", placeContent: "center", height: "100vh" }}>
                <img src="../../loading.gif" alt="loading"/>

      </div>
    )
  }

  return (
    <Base className="pt-5 container">
      <div className="products-section container pt-5 my-3">
        <Grid
          className="mb-3"
          container
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h5" style={{ textTransform: "capitalize" }}>
            {match.params.otype} Gifts
          </Typography>
        </Grid>

        {filterData()}
      </div>
    </Base>
  )
}
