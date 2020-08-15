import React, { useState, useEffect } from "react"
import { Base } from "../core/Base"
import { AdminContent } from "../core/AdminContent"
import { getAllCategories } from "./adminAPI"

export const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    totalStock: "",
    category: "",
    categories: [],
    pimage: "",
    loading: false,
    error: "",
    success: "",
    formData: "",
  })

  const {
    name,
    description,
    price,
    totalStock,
    category,
    categories,
    loading,
    error,
    formData,
    success,
  } = values

  const preLoadData = async () => {
    try {
      const response = await getAllCategories()
      if (response) {
        setValues({
          ...values,
          categories: response.data,
          formData: new FormData(),
        })
        console.log(response.data)
      }
    } catch (error) {
      console.log(error)
      setValues({
        ...values,
        error: "error.response.data.errormsg",
      })
    }
  }

  useEffect(() => {
    preLoadData()
  }, [])

  // const successMsg = () => {
  //   return (
  //     <div
  //       className='alert py-1 text-center alert-success '
  //       style={{ display: success ? "" : "none" }}
  //     >
  //       Successfully Added
  //     </div>
  //   )
  // }
  // const errorMsg = () => {
  //   return (
  //     <div
  //       className='alert py-1 text-center alert-danger'
  //       style={{ display: error ? "" : "none" }}
  //     >
  //       {error}
  //     </div>
  //   )
  // }

  const handleChange = (e) => {
    const { name, value } = e.target
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const createProductForm = () => {
    return (
      <form
        className='col-12 col-lg-12 my-3'
        noValidate
        onSubmit={handleSubmit}
      >
        <div className='row'>
          <div className='form-group col-lg-6'>
            <label>Product name</label>
            <input
              className='form-control'
              type='text'
              // value={}
              // onChange={handleChange}
              autoFocus
              required
              placeholder='eg: Samsung Galaxy A7'
            />
          </div>

          <div className='form-group col-lg-6'>
            <label>Price</label>

            <div class='input-group mb-2'>
              <div class='input-group-prepend'>
                <div class='input-group-text'>Rs</div>
              </div>
              <input
                className='form-control'
                type='number'
                // value={}
                // onChange={handleChange}
                autoFocus
                required
                placeholder='eg: 23999'
              />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            className='form-control'
            type='text'
            // value={}
            // onChange={handleChange}
            autoFocus
            required
            placeholder='eg: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis    '
          />
        </div>
        <div className='row'>
          <div className='form-group col-lg-6'>
            <label>Category</label>
            <select
              className='form-control'
              type='text'
              // value={}
              // onChange={handleChange}
              placeholder='eg: summer collection'
            >
              <option>select</option>
              {categories &&
                categories.map((item, index) => {
                  return <option key={index}>{item.name}</option>
                })}
            </select>
          </div>

          <div className='form-group col-lg-6'>
            <label>Total Stock</label>
            <input
              className='form-control'
              type='number'
              // value={}
              // onChange={handleChange}
              autoFocus
              required
              placeholder='eg: 99'
            />
          </div>
        </div>
        <div className='form-group'>
          <label>Product Image</label>
          <input
            className='form-control-file'
            type='file'
            // value={}
            // onChange={handleChange}
            autoFocus
            required
            placeholder='eg: summer collection'
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
      <div>
        <h4>Create product</h4>
        {createProductForm()}
      </div>
    </AdminContent>
  )
}
