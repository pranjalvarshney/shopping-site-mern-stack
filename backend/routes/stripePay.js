const express = require("express")
const { stripePayment } = require("../controllers/makePayment")
const router = express.Router()

router.post("/stripepayment", stripePayment)

module.exports = router
