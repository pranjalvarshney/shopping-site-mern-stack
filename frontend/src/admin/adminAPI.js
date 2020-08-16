import { API } from "../utils/backend"
import axios from "axios"

export const createCategory = async (userID, category, token) => {
  try {
    const response = await axios.post(
      `${API}/category/create/${userID}`,
      category,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response)
    return response
  } catch (error) {
    console.log(error.response)
    throw error
  }
}

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API}/categories`)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Product CRUD operations

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API}/products/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

//create a product
export const createProduct = async (userId, product, token) => {
  try {
    const response = await axios.post(
      `${API}/product/create/${userId}`,
      product,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    console.log(error.response)
    throw error
  }
}

//get a product via Id
export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API}/product/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response
  } catch (error) {
    console.log(error.response)
    throw error
  }
}

//delete a product
export const deleteProduct = async (productId, userId, token) => {
  try {
    const response = await axios.delete(
      `${API}/product/${productId}/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    console.log(error.response)
    throw error
  }
}

// update a product
export const updateProduct = async (
  productId,
  userId,
  token,
  updatedProduct
) => {
  try {
    const response = await axios.put(
      `${API}/product/${productId}/update/${userId}`,
      updatedProduct,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  } catch (error) {
    console.log(error.response)
    throw error
  }
}
