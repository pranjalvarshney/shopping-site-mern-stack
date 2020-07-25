const User = require("../models/user")
const { validationResult } = require("express-validator")

exports.signup = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    })
  }
  const { firstname, lastname, email, password } = req.body
  const newUser = new User({ firstname, lastname, email, password })
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
        msg: "An error occured while processing the request",
      })
    }
    return res.status(200).json({
      data: user,
    })
  })
}
