import React, { useState } from "react"
import { Base } from "../core/Base"
import { signup } from "../auth/helper"
import { Button } from "@material-ui/core"
import { useHistory } from "react-router-dom"

export const Signup = () => {

  const history = useHistory()
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
        className='alert text-center alert-success '
        style={{ display: success ? "" : "none" }}
      >
        Congratulations! Your account has been created successfully
      </div>
    )
  }

  const errorMsg = () => {
    return (
      <div
        className='alert  text-center alert-danger'
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
          <h4><b>Signup</b></h4>
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
                className='form-control'
              />
            </div>
            <div className='form-group my-1'>
              <label className='mb-0'>Email</label>
              <input
                name='email'
                onChange={handleChange}
                value={email}
                type='email'
                className='form-control'
              />
            </div>
            <div className='form-group my-1'>
              <label className='mb-0'>Password</label>
              <input
                name='password'
                onChange={handleChange}
                value={password}
                type='password'
                className='form-control'
              />
            </div>
            <button className='btn  btn-outline-success btn-block my-3'>
              Submit
            </button>
          </form>
          <div style={{ display: "flex",alignItems:"center", justifyContent: "space-between" }}>
            <Button size="small" disabled>Already have an account!</Button>
            <Button size="small" onClick={()=>{
              history.push("/signin")
            }}>Signin</Button>
          </div>
        </div>
      </div>
    </Base>
  )
}
