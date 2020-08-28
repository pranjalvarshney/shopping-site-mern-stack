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
    }
  }
}
