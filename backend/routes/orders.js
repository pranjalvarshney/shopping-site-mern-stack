const express = require("express")
const {
  getOrderByID,
  createOrder,
  getAllOrders,
} = require("../controllers/orders")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
const { route } = require("./product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
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

router.get(
  "/order/all/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
)

module.exports = router
