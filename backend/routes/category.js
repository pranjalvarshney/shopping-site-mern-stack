const express = require("express")
const { model } = require("../models/user")
const { getUserById } = require("../controllers/user")
const { getCategoryByID, createCategory } = require("../controllers/category")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const router = express.Router()

//params
router.param("userID", getUserById)
router.param("categoryID", getCategoryByID)

//actual routes
router.post(
  "/category/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
)

module.exports = router
