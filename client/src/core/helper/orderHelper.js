import axios from "axios"
import { API } from "../../utils/backend"

export const createOrder = async (userId, token, orderData) => {
  try {
    const response = await axios.post(
      `${API}/order/create/${userId}`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response.data)
  } catch (error) {
    console.log(error.response)
    throw error
  }
}
