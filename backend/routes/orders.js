const express = require("express")
const { getOrderByID } = require("../controllers/orders")
const router = express.Router()

router.param("orderID", getOrderByID)

module.exports = router
