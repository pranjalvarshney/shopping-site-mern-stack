const express = require("express")
const { getUserById } = require("../controllers/user")
const {
  getProductByID,
  createProduct,
  getProduct,
  getProductImage,
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

router.get("/product/:productID", getProduct)
router.get("/product/photo/:productID", getProductImage)
module.exports = router
