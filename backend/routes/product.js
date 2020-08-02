const express = require("express")
const { getUserById } = require("../controllers/user")
const { getProductByID } = require("../controllers/product")
const router = express.Router()

//params
router.param("userID", getUserById)
router.param("productID", getProductByID)

module.exports = router
