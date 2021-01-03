export const addToCartFunc = (item) => {
  let cart = []
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.push({
      ...item,
    })
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}

export const buyNowFunc = (item, next) => {
  let cart = []
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.push({
      ...item,
    })
    localStorage.setItem("cart", JSON.stringify(cart))
    next()
  }
}

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"))
    } else {
      let cart = []
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }
}

export const removeFromCart = (item) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      let data = JSON.parse(localStorage.getItem("cart"))
      let newCart = data.filter((obj) => obj._id !== item._id)
      localStorage.setItem("cart", JSON.stringify(newCart))
    }
  }
}

export const emptyCart = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart")
    let cart = []
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}
