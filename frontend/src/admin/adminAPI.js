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
