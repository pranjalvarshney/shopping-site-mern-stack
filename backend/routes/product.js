const express = require("express")
const { getUserById } = require("../controllers/user")
const { getProductByID, createProduct } = require("../controllers/product")
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

module.exports = router
