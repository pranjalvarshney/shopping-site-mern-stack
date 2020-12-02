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
      error: "",
    })
  }

  const successMsg = () => {
    return (
      <div
        className='alert py-1 text-center alert-success '
        style={{ display: success ? "" : "none" }}
      >
        Congratulations! Your account has been created successfully
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

  const onFormSubmit = async (e) => {
    e.preventDefault()
    setinputValues({ ...inputValues, error: false })

    try {
      const response = await signup({ name, email, password })
      if (response)
        setinputValues({
          ...inputValues,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        })
    } catch (error) {
      setinputValues({
        ...inputValues,
        error: error.response.data.errormsg,
        success: false,
      })
    }
  }

  return (
    <Base className={"container pt-5"}>
      <div className='row mt-5 pt-5'>
        <div className='col-xs-10 col-md-5 jumbotron py-3 mx-auto  bg-light'>
          <h4>Signup</h4>
          <p>Create a new account</p>
          {successMsg()}
          {errorMsg()}
          <form noValidate onSubmit={onFormSubmit}>
            <div className='form-group my-1'>
              <label className='mb-0'>Name</label>
              <input
                name='name'
                onChange={handleChange}
                value={name}
                type='text'
                className='form-control form-control-sm'
              />
            </div>
            <div className='form-group my-1'>
              <label className='mb-0'>Email</label>
              <input
                name='email'
                onChange={handleChange}
                value={email}
                type='email'
                className='form-control form-control-sm'
              />
            </div>
            <div className='form-group my-1'>
              <label className='mb-0'>Password</label>
              <input
                name='password'
                onChange={handleChange}
                value={password}
                type='password'
                className='form-control form-control-sm'
              />
            </div>
            <button className='btn btn-sm btn-outline-success btn-block my-3'>
              Submit
            </button>
            {/* <h6>{JSON.stringify(inputValues)}</h6> */}
          </form>
        </div>
      </div>
    </Base>
  )
}
