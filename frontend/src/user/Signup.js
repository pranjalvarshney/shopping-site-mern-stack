import React, { useState } from "react"
import { Base } from "../core/Base"
import { signup } from "../auth/helper"

export const Signup = () => {
  const [inputValues, setinputValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  })

  const { name, email, password, error, success } = inputValues

  const handleChange = (e) => {
    setinputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
      error: false,
    })
  }

  const successMsg = () => {
    return (
      <div
        className='alert alert-success'
        style={{ display: success ? "" : "none" }}
      >
        Congratulations! Your account has been created successfully
      </div>
    )
  }

  const errorMsg = () => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    )
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    setinputValues({ ...inputValues, error: false })
    try {
      const response = await signup({ name, email, password })
      // if (response.errormsg) {
      //   setinputValues({
      //     ...inputValues,
      //     success: false,
      //     error: response.errormsg,
      //   })
      // } else {
      setinputValues({
        ...inputValues,
        name: "",
        email: "",
        password: "",
        error: "",
        success: true,
      })
      console.log(response)
      // }
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <Base>
      <div className='row '>
        <div className='col-md-5 jumbotron mx-auto pt-5 bg-light'>
          <h4>Signup</h4>
          <p>Create a new account</p>
          {successMsg}
          {errorMsg}
          <form noValidate onSubmit={onFormSubmit}>
            <div className='form-group'>
              <label>Name</label>
              <input
                name='name'
                onChange={handleChange}
                value={name}
                type='text'
                className='form-control form-control-sm'
              />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                name='email'
                onChange={handleChange}
                value={email}
                type='email'
                className='form-control form-control-sm'
              />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                name='password'
                onChange={handleChange}
                value={password}
                type='password'
                className='form-control form-control-sm'
              />
            </div>
            <button className='btn btn-sm btn-outline-success btn-block'>
              Submit
            </button>
            <h6>{JSON.stringify(inputValues)}</h6>
          </form>
        </div>
      </div>
    </Base>
  )
}
