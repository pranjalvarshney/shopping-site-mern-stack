const express = require("express")
const {
  getOrderByID,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrderStatus,
  getAllOrdersByUser,
} = require("../controllers/orders")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
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

router.get("/orders/:userID", isSignedIn,isAuthenticated, getAllOrdersByUser)

router.get(
  "/orders/all/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
)

router.get(
  "/order/status/:orderID",
  isSignedIn,
  isAuthenticated,
  getOrderStatus
)

router.put(
  "/order/:orderID/status/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatus
)

module.exports = router
