const express = require("express")
const {
  getUserById,
  getUser,
  getUserPurchaseList,
  getAllUsers,
  updateUser,
} = require("../controllers/user")
const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const router = express.Router()

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  getUserPurchaseList
)

// router.get("/users", isSignedIn, getAllUsers)

module.exports = router
