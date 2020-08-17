import React, { useState, useEffect } from "react"
import { AdminContent } from "../core/AdminContent"
import { getAllCategories, deleteCategory } from "./adminAPI"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"

export const ManageCategories = () => {
  const [categoriesData, setCategoriesData] = useState({
    catData: [],
    loading: false,
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const {
    data: { user, token },
  } = isAuthenticated()

  const { catData, loading } = categoriesData

  const preLoadData = async () => {
    try {
      setCategoriesData({
        ...categoriesData,
        loading: true,
      })
      const response = await getAllCategories()
      if (response) {
        setCategoriesData({
          ...categoriesData,
          catData: response.data,
          loading: false,
        })
      }
    } catch (error) {
      setCategoriesData({
        ...categoriesData,
        loading: false,
      })
    }
  }

  useEffect(() => {
    preLoadData()
  }, [])

  const deleteBtn = async (categoryId) => {
    try {
      const response = await deleteCategory(user._id, categoryId, token)
      if (response) {
        preLoadData()
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
        <table class='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Category name</th>
              <th scope='col'>Manage</th>
            </tr>
          </thead>
          <tbody>
            {catData.map((category, index) => {
              return (
                <tr>
                  <th scope='row'>{index}</th>
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
