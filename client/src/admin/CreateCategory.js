import React, { useState } from "react"
import { isAuthenticated } from "../auth/helper"
import { AdminContent } from "../core/AdminContent"
import { createCategory } from "./adminAPI"

export const CreateCategory = () => {
  const [catName, setCatName] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { data } = isAuthenticated()
  const { user, token } = data

  const handleChange = (e) => {
    setError("")
    setSuccess(false)
    setCatName(e.target.value)
  }
  const formData = {
    name: catName,
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(token, user._id)
    try {
      setError("")
      setSuccess(false)
      const response = await createCategory(user._id, formData, token)
      if (response) {
        setSuccess(true)
        setCatName("")
        setError("")
      }
    } catch (error) {
      setError(error.response.data.errormsg)
      setSuccess(false)
    }
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
  const createCategoryForm = () => {
    return (
      <form className='col-10 col-lg-6 my-3' noValidate onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Enter category name</label>
          <input
            className='form-control'
            value={catName}
            onChange={handleChange}
            autoFocus
            required
            placeholder='eg . summer collection'
          />
        </div>
        <button type='submit' className='w-100 btn btn-outline-info'>
          Save
        </button>
      </form>
    )
  }

  return (
    <AdminContent>
      <div className=''>
        <h4>Create category</h4>
        {createCategoryForm()}
        {successMsg()}
        {errorMsg()}
      </div>
    </AdminContent>
  )
}
