const express = require("express")
const router = express.Router()
const { signup, signin, signout, isSignedIn } = require("../controllers/auth")
const { check } = require("express-validator")

router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }).withMessage("Enter a valid name"),
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password should be greater than 6 characters"),
  ],
  signup
)

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password should be greater than 6 characters"),
  ],
  signin
)

router.get("/signout", signout)

router.get("/asd", isSignedIn, (req, res) => {
  res.send("hello")
})

module.exports = router
