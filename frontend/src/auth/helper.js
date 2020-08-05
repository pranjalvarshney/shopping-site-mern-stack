import { API } from "../utils/backend"

export const signup = async (user) => {
  try {
    const response = await axios.post(`${API}/signup`, JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response)
  } catch (error) {
    console.log(error.response)
  }
}

export const signout = async()
