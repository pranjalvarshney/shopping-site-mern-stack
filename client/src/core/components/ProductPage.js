import React, { useState, useEffect } from "react"
import { Base } from "../Base"
import { API } from "../../utils/backend"
import { getProduct, getProductsHome } from "../helper/mainAPICalls"
import { addToCartFunc, buyNowFunc } from "../helper/addToCartHelper"
import { Redirect, useHistory } from "react-router-dom"
import { Toast } from "react-bootstrap"
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core"
import { ShowProducts } from "./ShowProducts"

export const ProductPage = ({ match }) => {
  const history = useHistory()
  const [redirect, setRedirect] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [products, setProducts] = useState([])
  // const [errors, setErrors] = useState([])

  const loadData = async () => {
    try {
      const response = await getProductsHome()
      // console.log(response.data)

      if (response) {
        setProducts(response.data)
        // setErrors("")
      }
    } catch (error) {
      // setErrors(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const addToCartMethod = async () => {
    if (!success) {
      addToCartFunc(data)
      setSuccess(true)
    }
  }
  const buyNowMethod = async () => {
    if (!success) {
      buyNowFunc(data, () => {
        setRedirect(true)
      })
    }
  }

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }

  const preloadData = async (productId) => {
    try {
      const response = await getProduct(productId)

      if (response) {
        setData(response.data)
        setError("")
      }
    } catch (error) {
      setError(error.response.data.errormsg)
    }
  }
  useEffect(() => {
    preloadData(match.params.productId)
  }, [match.params.productId])

  const successMsg = () => {
    return (
      <Toast
        onClose={() => setSuccess(false)}
        show={success}
        delay={2000}
        autohideCategories
        style={{
          position: "absolute",
          top: "100px",
          right: "100px",
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">{data.name}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>Product successfully added to cart!</Toast.Body>
      </Toast>
    )
  }

  const errorMsg = () => {
    return (
      <div
        className="alert py-1 text-center alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    )
  }
  // console.log(data)
  if (data === null) {
    return (
      <div style={{ display: "grid", placeContent: "center", height: "100vh" }}>
        <img src={"../../loading.gif"} alt="loading" />
      </div>
    )
  }

  return (
    <Base className="container py-5">
      <div className="product-page mt-5 py-5">
        {successMsg()}
        {errorMsg()}

        <Card className="mb-5">
          <Grid container>
            <Grid item xs={12} md={6}>
              <img
                src={`${API}/product/photo/${match.params.productId}`}
                alt="product"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography component="h5" variant="h5">
                  {data.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Product ID - {data._id}
                </Typography>
                <h6>
                  <b>MRP : </b>
                  <span className="h3">
                    {data.price}
                    <small className="h6 text-muted text-sm font-weight-normal">
                      {" "}
                      (inclusive of all taxes)
                    </small>
                  </span>
                </h6>

                {/* <Chip label={`${data.category.name}`} variant="default"></Chip> */}
                <Typography component="h6">
                  <b>Description :</b>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {data.description}
                </Typography>

                <br />
                <Typography variant="button">
                  Stock left : {data.totalStock}{" "}
                  <Typography variant="overline" color="error">
                    <b>Hurry!</b>
                  </Typography>
                </Typography>
                <br />
                {data.totalStock > 0 ? (
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      {!success ? (
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          size="large"
                          onClick={buyNowMethod}
                        >
                          Buy now
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            history.push("/cart")
                          }}
                          fullWidth
                          style={{ background: "#64DD17" }}
                          variant="contained"
                          size="large"
                        >
                          Go to cart
                        </Button>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        color="secondary"
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={addToCartMethod}
                      >
                        Add to cart
                        {getRedirect(redirect)}
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Button
                    className="my-3 "
                    fullWidth
                    style={{ background: "yellow" }}
                    variant="contained"
                  >
                    Out of stock
                  </Button>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <ShowProducts products={products} />
      </div>
    </Base>
  )
}
