import React, { useState } from "react"
import { Base } from "../core/Base"
import { signin, authenticate, isAuthenticated } from "../auth/helper"
import { Redirect } from "react-router-dom"

export const Signin = () => {
  const [inputValues, setinputValues] = useState({
    email: "admin@admin.com",
    password: "123123",
    error: "",
    success: false,
    loading: false,
  })

  const { email, password, error, success, loading } = inputValues
  const { data } = isAuthenticated()

  const handleChange = (e) => {
    const { name, value } = e.target
    setinputValues({
      ...inputValues,
      [name]: value,
      error: "",
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setinputValues({ ...inputValues, error: false, loading: true })

    try {
      const response = await signin({ email, password })
      authenticate(response, () => {
        setinputValues({
          ...inputValues,
          success: true,
          error: "",
          loading: true,
        })
      })
    } catch (error) {
      console.log(error)
      setinputValues({
        ...inputValues,
        error: error.response.data.errormsg,
        success: false,
        loading: false,
      })
    }
  }

  const redirectPage = () => {
    if (success) {
      // console.log(data)
      if (data.user && data.user.role === 1) {
        // console.log("hi")
        return <Redirect to='/admin' />
      } else {
        return <Redirect to='/user' />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />
    }
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

  const showLoading = () => (
    <div className='d-flex justify-content-center'>
      <div
        className='spinner-border'
        role='status'
        style={{ display: loading ? "" : "none" }}
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )

  return (
    <Base>
      <div className='row '>
        <div className='col-md-5 jumbotron mx-auto mt-5 py-5'>
          <h4>Signin</h4>
          {errorMsg()}
          {showLoading()}
          <form noValidate onSubmit={handleSubmit}>
            <div className='form-group my-1'>
              <label className='mb-0'>Email</label>
              <input
                name='email'
                type='email'
                value={email}
                onChange={handleChange}
                className='form-control form-control-sm'
              />
            </div>
            <div className='form-group my-1'>
              <label className='mb-0'>Password</label>
              <input
                value={password}
                onChange={handleChange}
                name='password'
                type='password'
                className='form-control form-control-sm'
              />
            </div>
            <button
              type='submit'
              className='btn btn-sm my-3 btn-outline-success btn-block'
            >
              Submit
            </button>
            {redirectPage()}
          </form>
        </div>
      </div>
    </Base>
  )
}
