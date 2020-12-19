export const addToWishList = (item) => {
  let wishlist = []
  if (typeof window !== undefined) {
    if (localStorage.getItem("wishlist")) {
      wishlist = JSON.parse(localStorage.getItem("wishlist"))
    }
    wishlist.push({
      ...item,
    })
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }
}

export const loadWishlist = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("wishlist")) {
      return JSON.parse(localStorage.getItem("wislist"))
    }
  }
}
