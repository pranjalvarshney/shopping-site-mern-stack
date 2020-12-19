const express = require("express")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const {
  getBlogByID,
  getBlog,
  createBlog,
  getBlogs,
  deleteBlog,
  getBlogPicture,
} = require("../controllers/blog")
const router = express.Router()
const { getUserById } = require("../controllers/user")

//params
router.param("userID", getUserById)
router.param("blogID", getBlogByID)

//main routes

router.get("/blog/:blogID", getBlog)
router.get("/blogs", getBlogs)

// route to get blog picture
router.get("/blog/picture/:blogID", getBlogPicture)

// create blog
router.post(
  "/blog/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createBlog
)

// delete blog
router.delete(
  "/blog/:blogID/remove/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteBlog
)

module.exports = router
