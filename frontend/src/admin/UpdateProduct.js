import React, { useState, useEffect } from "react"
import { AdminContent } from "../core/AdminContent"
import { getAllCategories, getProduct, updateProduct } from "./adminAPI"
import { isAuthenticated } from "../auth/helper"
import { useHistory } from "react-router-dom"

export const UpdateProduct = ({ match }) => {
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
    success: false,
    formData: "",
  })
  const history = useHistory()
  const {
    name,
    description,
    price,
    totalStock,
    categories,
    error,
    formData,
    success,
  } = values

  const { data } = isAuthenticated()
  const { user, token } = data

  
  const preloadCategories = async () => {
    try {
      const response = await getAllCategories()
        setValues({
        categories: response.data,
        formData: new FormData(),
      })
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    const preLoadData = async (productId) => {
      try {
        setValues({
          ...values,
          loading: true,
          error: "",
        })
        const response = await getProduct(productId)
        if (response) {
          setValues({
            ...values,
            name: response.data.name,
            description: response.data.description,
            price: response.data.price,
            category: response.data.category.name,
            totalStock: response.data.totalStock,
            pimage: response.data.pimage,
            formData: new FormData(),
            loading: false,
            error: "",
          })
        }
      } catch (error) {
        setValues({
          ...values,
          error: error.response.data.errormsg,
          loading: false,
        })
      }
    }
    preLoadData(match.params.productId) // using match to get the productId from the params
    preloadCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.productId])

  const successMsg = () => {
    return (
      <div
        className='alert py-1 text-center alert-success '
        style={{ display: success ? "" : "none" }}
      >
        Successfully Updated
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

  const handleChange = (e) => {
    const value =
      e.target.name === "pimage" ? e.target.files[0] : e.target.value

    formData.set(e.target.name, value)
    setValues({
      ...values,
      [e.target.name]: value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setValues({
        ...values,
        loading: true,
        success: false,
      })
      const response = await updateProduct(
        match.params.productId,
        user._id,
        token,
        formData
      )
      if (response) {
        setValues({
          ...values,
          name: "",
          description: "",
          totalStock: "",
          price: "",
          category: "",
          success: true,
          pimage: "",
          loading: false,
          error: "",
        })
        history.push("/admin/manage/products")
      }
    } catch (error) {
      console.log(error.response)
      setValues({
        success: false,
        loading: false,
        error: error.response.data.errormsg,
      })
    }
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
              name='name'
              value={name}
              onChange={handleChange}
              placeholder='eg: Samsung Galaxy A7'
            />
          </div>

          <div className='form-group col-lg-6'>
            <label>Price</label>

            <div className='input-group mb-2'>
              <div className='input-group-prepend'>
                <div className='input-group-text'>Rs</div>
              </div>
              <input
                className='form-control'
                type='number'
                name='price'
                value={price}
                onChange={handleChange}
                placeholder='eg: 23999'
              />
            </div>
          </div>
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            className='form-control'
            name='description'
            value={description}
            onChange={handleChange}
            placeholder='eg: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis    '
          />
        </div>
        <div className='row'>
          <div className='form-group col-lg-6'>
            <label>Category</label>
            <select
              className='form-control'
              name='category'
              onChange={handleChange}
            >
              <option>{values.category}</option>
              {categories &&
                categories.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  )
                })}
            </select>
          </div>

          <div className='form-group col-lg-6'>
            <label>Total Stock</label>
            <input
              className='form-control'
              type='number'
              name='totalStock'
              value={totalStock}
              onChange={handleChange}
              placeholder='eg: 99'
            />
          </div>
        </div>
        <div className='form-group'>
          <label>Product Image</label>
          <input
            className='form-control-file'
            type='file'
            accept='image'
            name='pimage'
            onChange={handleChange}
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
        <h4>
          Update product -{" "}
          <span className='text-muted h6'>{match.params.productId}</span>
        </h4>
        {errorMsg()}
        {successMsg()}
        {createProductForm()}
      </div>
    </AdminContent>
  )
}
