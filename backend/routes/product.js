const express = require("express")
const { getUserById } = require("../controllers/user")
const {
  getProductByID,
  createProduct,
  getProduct,
  getProductImage,
  removeProduct,
  updateProduct,
} = require("../controllers/product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const router = express.Router()

//params
router.param("userID", getUserById)
router.param("productID", getProductByID)

// create route
router.post(
  "/product/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
)

// read route
router.get("/product/:productID", getProduct)
router.get("/product/photo/:productID", getProductImage)

// update route
router.put(
  "/product/:productID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
)

//delete route
router.delete(
  "/product/:productID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
)

// listing routes

module.exports = router
