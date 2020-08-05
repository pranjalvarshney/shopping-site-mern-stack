import React, { useState } from "react"
import { Base } from "../core/Base"

export const Signin = () => {
  return (
    <Base>
      <div className='row '>
        <div className='col-md-5 jumbotron mx-auto pt-5 bg-light'>
          <h4>Signin</h4>

          <form noValidate>
            <div className='form-group'>
              <label>Email</label>
              <input
                name='email'
                type='email'
                className='form-control form-control-sm'
              />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                name='password'
                type='password'
                className='form-control form-control-sm'
              />
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
