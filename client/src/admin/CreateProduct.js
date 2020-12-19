import React, { useState, useEffect } from "react"
import { AdminContent } from "../core/AdminContent"
import { getAllCategories, createProduct } from "./adminAPI"
import { isAuthenticated } from "../auth/helper"
import { Multiselect } from "multiselect-react-dropdown"

export const CreateProduct = () => {
  let olist = [
    "birthday",
    "anniversary",
    "love and romance",
    "wedding",
    "sorry",
    "thankyou",
    "getwellsoon",
    "congratulations",
    "goodluck",
    "housewarming gifts",
  ]
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

  useEffect(() => {
    const preLoadData = async () => {
      try {
        const response = await getAllCategories()
        if (response) {
          setValues({
            ...values,
            formData: new FormData(),
            categories: response.data,
          })
          // console.log(response.data)
        }
      } catch (error) {
        // console.log(error)
        setValues({
          ...values,
          error: "error.response.data.errormsg",
        })
      }
    }
    preLoadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const successMsg = () => {
    return (
      <div
        className="alert py-1 text-center alert-success "
        style={{ display: success ? "" : "none" }}
      >
        Successfully Added
      </div>
    )
  }
  const errorMsg = () => {
    return (
      <div
        className="alert py-1 text-center alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    )
  }

  const handleMultiSelect = (data) => {
    // console.log(data)
    // formData.set("occasions",data)
    // console.log(formData)
    formData.set("occasions",data.toString())
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

    
      const response = await createProduct(user._id, formData, token)
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
        className="col-12 col-lg-12 my-3"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="form-group col-lg-6">
            <label>Product name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              autoFocus
              required
              placeholder="eg: Samsung Galaxy A7"
            />
          </div>

          <div className="form-group col-lg-6">
            <label>Price</label>

            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">Rs</div>
              </div>
              <input
                className="form-control"
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                placeholder="eg: 23999"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="eg: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis    "
          />
        </div>
        <div className="mb-3">
          <label>Occasions</label>
          <Multiselect
            options={olist}
            isObject={false}
            onSelect={handleMultiSelect}
            onRemove={handleMultiSelect}
          />
        </div>
        <div className="row">
          <div className="form-group col-lg-6">
            <label>Category</label>
            <select
              className="form-control"
              name="category"
              onChange={handleChange}
            >
              <option>select</option>
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

          <div className="form-group col-lg-6">
            <label>Total Stock</label>
            <input
              className="form-control"
              type="number"
              name="totalStock"
              value={totalStock}
              onChange={handleChange}
              placeholder="eg: 99"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-lg-6">
            <label>Product Image</label>
            <input
              className="form-control-file"
              type="file"
              accept="image"
              name="pimage"
              onChange={handleChange}
            />
          </div>
          <div className="col-lg-6">
            <button type="submit" className="w-100 btn btn-outline-info ">
              Save
            </button>
          </div>
        </div>
      </form>
    )
  }
  return (
    <AdminContent>
      <div>
        <h4>Create product</h4>
        {errorMsg()}
        {successMsg()}
        {createProductForm()}
      </div>
    </AdminContent>
  )
}
