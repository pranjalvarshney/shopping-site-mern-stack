import { API } from "../../utils/backend"
import axios from "axios"

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API}/products`)
    return response
  } catch (error) {
    throw error
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