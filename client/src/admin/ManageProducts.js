import React, { useState, useEffect } from "react"
import { AdminContent } from "../core/AdminContent"
import { getProducts, deleteProduct } from "./adminAPI"
import { isAuthenticated } from "../auth/helper"
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"

export const ManageProducts = () => {
  const history = useHistory()
  const [preData, setPreData] = useState({
    getData: [],
    loading: false,
  })
  const { getData, loading } = preData

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { data } = isAuthenticated()
  const { user, token } = data

  const preLoad = async () => {
    setPreData({
      ...preData,
      loading: true,
    })
    try {
      const response = await getProducts()
      if (response) {
        console.log(response.data)
        setPreData({
          ...preData,
          getData: response.data,
          loading: false,
        })
        setError("")
      }
    } catch (error) {
      console.log(error)
      setPreData({
        ...preData,
        loading: false,
      })
      // setError(error.response.data.errormsg)
    }
  }

  useEffect(() => {
    preLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteBtn = (productId) => {
    try {
      const response = deleteProduct(user._id, productId, token)
      if (response) {
        setSuccess(true)
        setError("")
        preLoad()
      }
    } catch (error) {
      setSuccess(false)
      setError(error.response.data.errormsg)
    }
  }

  const showLoading = () => (
    <div className="d-flex justify-content-center ">
      <div
        className="spinner-border"
        role="status"
        style={{ display: loading ? "" : "none" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
  const successMsg = () => {
    return (
      <div
        className="alert py-1 text-center alert-success "
        style={{ display: success ? "" : "none" }}
      >
        Successfully Deleted
      </div>
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
  return (
    <AdminContent>
      <div>
        <h4>Manage products</h4>

        <div className="table-responsive">
          <table className="table table-hover table-md border-0">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">Manage</th>
              </tr>
            </thead>
            <tbody>
              {getData &&
                getData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.totalStock}</td>
                      <td>{item.price}</td>
                      <td>
                        <Button
                          color="primary"
                          size="small"
                          variant="contained"
                          style={{ textDecoration: "none", color: "#fff" }}
                          onClick={() => {
                            history.push(`/admin/product/update/${item._id}`)
                            window.location.reload()
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="ml-3"
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            deleteBtn(item._id)
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        {getData.length === 0 && (
          <div className="text-center">
            <h6>
              No products found!
              <br /> Add new products
            </h6>
          </div>
        )}
        {showLoading()}
        {errorMsg()}
        {successMsg()}
      </div>
    </AdminContent>
  )
}
