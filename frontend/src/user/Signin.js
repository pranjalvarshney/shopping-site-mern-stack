import React, { useState } from "react"
import { Base } from "../core/Base"
import { signin, authenticate, isAuthenticated } from "../auth/helper"
import { Redirect } from "react-router-dom"

export const Signin = () => {
  const [inputValues, setinputValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  })

  const { email, password, error, success, loading } = inputValues
  const { user } = isAuthenticated()

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
          ...inputValues,
          success: true,
          error: "",
          loading: true,
        })
      })
    } catch (error) {
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
      // if (user && user.role == 1) {
      //   return <Redirect to='/' />
      // } else {
      //   return <Redirect to='/' />
      // }
      if (isAuthenticated()) {
        return <Redirect to='/' />
      }
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
    <div class='d-flex justify-content-center'>
      <div
        class='spinner-border'
        role='status'
        style={{ display: loading ? "" : "none" }}
      >
        <span class='sr-only'>Loading...</span>
      </div>
    </div>
  )

  return (
    <Base>
      <div className='row '>
        <div className='col-md-5 jumbotron mx-auto mt-5 py-5 bg-light'>
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
