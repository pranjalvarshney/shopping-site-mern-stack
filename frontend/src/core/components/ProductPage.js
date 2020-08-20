import React, { useState, useEffect } from "react"
import { Base } from "../Base"
import { API } from "../../utils/backend"
import { getProduct } from "../helper/mainAPICalls"

export const ProductPage = ({ match }) => {
  const [addToCart, setAddToCart] = useState(true)
  const [removeFromCart, setRemoveFromCart] = useState(false)

  const [data, setData] = useState([])
  const [error, setError] = useState("")

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
  }, [])
  return (
    <Base className='container my-5'>
      <div className='product-page '>
        <div className='row'>
          <div className='col-md-6'>
            <img src={`${API}/product/photo/${match.params.productId}`} />
          </div>
          <div className='col-md-6 product-info'>
            <h4>{data.name}</h4>
            <small className='text-muted'>catID: {data.category}</small>
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
              <button className='btn btn-danger py-2 font-weight-bold p-btn'>
                Buy now
              </button>
              <button className='btn btn-warning py-2 font-weight-bold p-btn'>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  )
}
