import { API } from "../utils/backend"
import axios from "axios"

export const signup = async (user) => {
  try {
    const response = await axios.post(`${API}/signup`, JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response
  } catch (error) {
    // console.log(error.response)
    throw error
  }
}

export const signin = async (user) => {
  try {
    const response = await axios.post(`${API}/signin`, JSON.stringify(user), {
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

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data))
    next()
  }
}

export const signout = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt")
    next()
    try {
      const response = await axios.get(`${API}/signout`)
      // console.log(response)

      return response
    } catch (error) {
      console.log(error.response)
    }
  }
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"))
  } else {
    return false
  }
}
