const express = require("express")
const router = express.Router()
const { signup, signin, signout } = require("../controllers/auth")
const { check } = require("express-validator")

router.post(
  "/signup",
  [
    check("firstname")
      .isLength({ min: 3 })
      .withMessage("enter a valid first name"),
    check("lastname")
      .isLength({ min: 3 })
      .withMessage("enter a valid last name"),
    check("email").isEmail().withMessage("enter a valid email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should be greater than 6 characters"),
  ],
  signup
)

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("enter a valid email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should be greater than 6 characters"),
  ],
  signin
)

router.get("/signout", signout)

module.exports = router
