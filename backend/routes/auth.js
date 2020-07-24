const express = require("express")
const router = express.Router()
const { sample } = require("../controllers/auth")

router.get("/a", sample)

module.exports = router
