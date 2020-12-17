import React, { useState, useEffect } from "react"
import { AdminContent } from "../core/AdminContent"
import { getAllCategories, deleteCategory } from "./adminAPI"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"

export const ManageCategories = () => {
  const [catData, setCatData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const {
    data: { user, token },
  } = isAuthenticated()

  

  useEffect(()=>{
    const preLoadData = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await getAllCategories()
        if (response) {
          setCatData(response.data)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        setError(error.response.data.errormsg)
      }
    }
    preLoadData()
  },[])

  const deleteBtn = async (categoryId) => {
    try {
      const response = await deleteCategory(user._id, categoryId, token)
      if (response) {
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
        <h4>Manage all categories</h4>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Category name</th>
              <th scope='col'>Manage</th>
            </tr>
          </thead>
          <tbody>
            {catData &&
              catData.map((category, index) => {
                return (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{category.name}</td>
                    <td>
                      <span className='btn badge badge-warning p-2 text-white mr-3'>
                        <Link
                          to={`/admin/product/update/${category._id}`}
                          style={{ textDecoration: "none", color: "#fff" }}
                        >
                          Edit
                        </Link>
                      </span>
                      <span
                        className='btn badge badge-danger p-2 text-white'
                        onClick={() => {
                          deleteBtn(category._id)
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
        {catData.length === 0 && (
          <div className='text-center'>
            <h6>
              No categories found!
              <br /> Add new categories
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
