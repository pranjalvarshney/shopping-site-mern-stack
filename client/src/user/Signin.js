import React, { useState } from "react"
import { Base } from "../core/Base"
import { signin, authenticate, isAuthenticated } from "../auth/helper"
import { Redirect, useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"

export const Signin = () => {
  const history = useHistory()
  const [inputValues, setinputValues] = useState({
    email: "",
    password: "",
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
        return <Redirect to="/admin" />
      } else {
        return <Redirect to="/user" />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />
    }
  }

  const errorMsg = () => {
    return (
      <div
        className="alert text-center alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    )
  }

  const showLoading = () => (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        role="status"
        style={{ display: loading ? "" : "none" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  return (
    <Base className="container pt-5">
      <div className="row mt-5 pt-5 mx-3">
        <div className="col-xs-12 col-md-5 m-auto jumbotron bg-light py-5">
          <h4>
            <b>Signin</b>
          </h4>
          {errorMsg()}
          {showLoading()}
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-group my-1">
              <label className="mb-0">Email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                className="form-control "
              />
            </div>
            <div className="form-group my-1">
              <label className="mb-0">Password</label>
              <input
                value={password}
                onChange={handleChange}
                name="password"
                type="password"
                className="form-control "
              />
            </div>
            <button
              type="submit"
              className="btn  my-3 btn-outline-success btn-block"
            >
              Submit
            </button>
            {redirectPage()}
          </form>
          <div style={{ display: "flex",alignItems:"center", justifyContent: "space-between" }}>
            <Button size="small" disabled>new user!</Button>
            <Button size="small" onClick={()=>{
              history.push("/signup")
            }}>Signup</Button>
          </div>
        </div>
      </div>
    </Base>
  )
}
