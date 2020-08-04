const express = require("express")
const { getOrderByID, createOrder } = require("../controllers/orders")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
const { route } = require("./product")
const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const { updateStock } = require("../controllers/product")
const router = express.Router()

//params
router.param("userID", getUserById)
router.param("orderID", getOrderByID)

//create order
router.post(
  "/order/create/:userID",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
)

module.exports = router
