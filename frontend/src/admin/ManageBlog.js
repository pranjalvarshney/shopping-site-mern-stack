import React, { useState, useEffect } from "react"
import { AdminContent } from "../core/AdminContent"
import { deleteBlog, getAllBlogs } from "./adminAPI"
import { isAuthenticated } from "../auth/helper"
import { Link } from "react-router-dom"

export const ManageBlog = () => {
  const [blogData, setBlogData] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { data } = isAuthenticated()
  const { user, token } = data

  const preLoadBlogdata = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await getAllBlogs()
      if (response) {
        setBlogData(response.data)
        setError("")
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setError(error.response.data.errormsg)
    }
  }

  useEffect(() => {
    preLoadBlogdata()
  }, [])

  const deleteBtn = async (blogId) => {
    try {
      setSuccess(false)
      setError("")
      const response = await deleteBlog(user._id, blogId, token)
      if (response) {
        preLoadBlogdata()
        setError("")
        setSuccess(true)
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
        <h4>Manage Blogs</h4>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Blog title</th>
              <th scope='col'>Manage</th>
            </tr>
          </thead>
          <tbody>
            {blogData &&
              blogData.map((blog, index) => {
                return (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{blog.title}</td>
                    <td>
                      <span className='btn badge badge-warning p-2 text-white mr-3'>
                        <Link
                          to={`/admin/blog/update/${blog._id}`}
                          style={{ textDecoration: "none", color: "#fff" }}
                        >
                          Edit
                        </Link>
                      </span>
                      <span
                        className='btn badge badge-danger p-2 text-white'
                        onClick={() => {
                          deleteBtn(blog._id)
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
        {blogData.length === 0 && (
          <div className='text-center'>
            <h6>
              No categories found!
              <br /> Create new blogs
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
