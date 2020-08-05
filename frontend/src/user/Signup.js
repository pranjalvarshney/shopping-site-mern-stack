import React, { useState } from "react"
import { Base } from "../core/Base"

export const Signup = () => {
  const [inputValues, setinputValues] = useState({})
  return (
    <Base>
      <div className='row '>
        <div className='col-md-5 jumbotron mx-auto pt-5 bg-light'>
          <h4>Signup</h4>
          <p>Create a new account</p>
          <form noValidate>
            <div className='form-group'>
              <label>Name</label>
              <input type='text' className='form-control form-control-sm' />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input type='email' className='form-control form-control-sm' />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input type='password' className='form-control form-control-sm' />
            </div>
            <button className='btn btn-sm btn-outline-success btn-block'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Base>
  )
}
