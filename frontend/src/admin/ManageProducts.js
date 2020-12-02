import React, { useState, useEffect } from "react"
import { AdminContent } from "../core/AdminContent"
import { getProducts, deleteProduct } from "./adminAPI"
import { isAuthenticated } from "../auth/helper"
import { Link } from "react-router-dom"

export const ManageProducts = () => {
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
        // console.log(response.data)
        setPreData({
          ...preData,
          getData: response.data,
          loading: false,
        })
        setError("")
      }
    } catch (error) {
      // console.log(error.response)
      setPreData({
        ...preData,
        loading: false,
      })
      setError(error.response.data.errormsg)
    }
  }

  useEffect(preLoad, [])

  const deleteBtn = async (productId) => {
    try {
      const response = await deleteProduct(user._id, productId, token)
      if (response) {
        preLoad()
        setSuccess(true)
        setError("")
      }
    } catch (error) {
      setSuccess(false)
      setError(error.response.data.errormsg)
    }
  }

  const showLoading = () => (
    <div className='d-flex justify-content-center '>
      <div
        className='spinner-border'
        role='status'
        style={{ display: loading ? "" : "none" }}
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
  const successMsg = () => {
    return (
      <div
        className='alert py-1 text-center alert-success '
        style={{ display: success ? "" : "none" }}
      >
        Successfully Deleted
      </div>
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
    <AdminContent>
      <div>
        <h4>Manage products</h4>

        <table className='table table-hover table-md border-0'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Category</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Price</th>
              <th scope='col'>Manage</th>
            </tr>
          </thead>
          <tbody>
            {getData &&
              getData.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.category.name}</td>
                    <td>{item.totalStock}</td>
                    <td>{item.price}</td>
                    <td>
                      <span className='btn badge badge-warning p-2 text-white mr-3'>
                        <Link
                          to={`/admin/product/update/${item._id}`}
                          style={{ textDecoration: "none", color: "#fff" }}
                        >
                          Edit
                        </Link>
                      </span>
                      <span
                        className='btn badge badge-danger p-2 text-white'
                        onClick={() => {
                          deleteBtn(item._id)
                        }}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        {getData.length === 0 && (
          <div className='text-center'>
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
