const express = require("express")
const { model } = require("../models/user")
const { getUserById } = require("../controllers/user")
const {
  getCategoryByID,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const router = express.Router()

//params
router.param("userID", getUserById)
router.param("categoryID", getCategoryByID)

//@actual routes

//create route
router.post(
  "/category/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
)

//read route

router.get("/category/:categoryID", getCategory)
router.get("/categories", getAllCategory)

//update route
router.put(
  "/category/:categoryID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
)

//delete route
router.delete(
  "/category/:categoryID/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
)

module.exports = router
