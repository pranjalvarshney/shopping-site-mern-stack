import React, { useState, useEffect } from "react"
import { Base } from "../Base"
import { API } from "../../utils/backend"
import { getProduct } from "../helper/mainAPICalls"
import { addToCartFunc, buyNowFunc } from "../helper/addToCartHelper"
import { Redirect } from "react-router-dom"
import { Toast } from "react-bootstrap"

export const ProductPage = ({ match }) => {
  const [redirect, setRedirect] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

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
      return <Redirect to='/cart' />
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
          <strong className='mr-auto'>{data.name}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>Product successfully added to cart!</Toast.Body>
      </Toast>
    )
  }

  const errorMsg = () => {
    return (
      <div
        className='alert py-1 text-center alert-danger'
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    )
  }

  return (
    <Base className='container py-5'>
      <div className='product-page mt-5 py-5'>
        {successMsg()}
        {errorMsg()}
        <div className='row'>
          <div
            className='col-md-6'
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`${API}/product/photo/${match.params.productId}`}
              alt='product'
            />
          </div>
          <div className='col-lg-6 product-info'>
            <h4>{data.name}</h4>
            <small className='text-muted'>PId: {data.category}</small>
            <div>
              <h6>Description</h6>
              <p className='text-muted'>{data.description}</p>
            </div>
            <h6>
              Price:
              <span className='h3'>
                {"  "}
                {data.price}{" "}
                <small className='h6 text-muted text-sm font-weight-normal'>
                  (inclusive of all taxes)
                </small>
              </span>
            </h6>
            <div className='row justify-content-around'>
              {!success ? (
                <button
                  onClick={buyNowMethod}
                  className='btn btn-danger py-2 font-weight-bold p-btn'
                >
                  Buy now
                </button>
              ) : (
                <button
                  onClick={buyNowMethod}
                  className='btn btn-success py-2 font-weight-bold p-btn'
                >
                  Go to cart
                </button>
              )}
              <button
                onClick={addToCartMethod}
                className='btn btn-warning py-2 font-weight-bold p-btn'
              >
                Add to cart
                {getRedirect(redirect)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  )
}
