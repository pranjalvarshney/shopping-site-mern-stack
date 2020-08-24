const express = require("express")
const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const {
  getBlogByID,
  getBlog,
  createBlog,
  getBlogs,
} = require("../controllers/blog")
const router = express.Router()
const { getUserById } = require("../controllers/user")

//params
router.param("userID", getUserById)
router.param("blogID", getBlogByID)

//main routes

router.get("/blog/:blogID", getBlog)
router.get("/blogs", getBlogs)

router.post("/blog/create", createBlog)

module.exports = router
