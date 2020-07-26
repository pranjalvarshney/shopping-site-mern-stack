const express = require("express")
const { getUserById, getUser } = require("../controllers/user")
const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const router = express.Router()

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)

module.exports = router
