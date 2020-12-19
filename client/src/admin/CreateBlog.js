import React, { useState } from "react"
import { AdminContent } from "../core/AdminContent"
import { isAuthenticated } from "../auth/helper"
import { postBlog } from "./adminAPI"

export const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    tagline: "",
    content: "",
    picture: "",
    error: "",
    success: false,
    formData: new FormData(),
  })

  const { data } = isAuthenticated()
  const { user, token } = data
  const { title, tagline, content, error, success, formData } = blogData

  const handleChange = (e) => {
    const value =
      e.target.name === "picture" ? e.target.files[0] : e.target.value
    formData.set(e.target.name, value)
    setBlogData({
      ...blogData,
      [e.target.name]: value,
      error: "",
      success: false,
    })
  }

  const successMsg = () => {
    return (
      <div
        className='alert py-1 text-center alert-success '
        style={{ display: success ? "" : "none" }}
      >
        Successfully Added
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setBlogData({
        ...blogData,
        error: "",
        success: false,
      })
      const response = await postBlog(user._id, formData, token)
      if (response) {
        // console.log(response.data)
        setBlogData({
          ...blogData,
          title: "",
          tagline: "",
          content: "",
          picture: "",
          error: "",
          success: true,
        })
      }
    } catch (error) {
      // console.log(error.response)
      setBlogData({
        ...blogData,
        error: error.response.data.errormsg,
        success: false,
      })
    }
  }

  const createBlogForm = () => {
    return (
      <div>
        <form noValidate onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              className='form-control'
              name='title'
              value={title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Tagline</label>
            <input
              className='form-control'
              name='tagline'
              value={tagline}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              className='form-control'
              name='content'
              value={content}
              onChange={handleChange}
            />
          </div>
          <div className='row '>
            <div className='col-md-6'>
              <label>Picture</label>
              <input
                className='form-control-file'
                name='picture'
                type='file'
                accept='image'
                onChange={handleChange}
              />
            </div>
            <div className='col-md-6 mt-auto mx-auto'>
              <button type='submit' className='btn btn-outline-primary w-100'>
                Create Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <AdminContent>
      <div>
        <h4>Create Blog</h4>
        {errorMsg()}
        {successMsg()}
        {createBlogForm()}
      </div>
    </AdminContent>
  )
}
