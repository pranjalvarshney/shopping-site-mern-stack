import { API } from "../../utils/backend"
import axios from "axios"

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API}/products`)
    return response.data
  } catch (error) {
    throw error
  }
}
export const getProductsHome = async () => {
  try {
    const response = await axios.get(`${API}/home/products`)
    return response
  } catch (error) {
    throw error.response.data.errormsg
  }
}

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API}/product/${productId}`, productId)
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${API}/blogs`)
    return response
  } catch (error) {
    throw error
  }
}
