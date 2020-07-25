const User = require("../models/user")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const expressJWT = require("express-jwt")

exports.signup = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errormsg: errors.array()[0].msg,
    })
  }
  const { firstname, lastname, email, password } = req.body
  const newUser = new User({ firstname, lastname, email, password })
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured while processing the request",
      })
    }
    return res.status(200).json({
      data: user,
    })
  })
}

exports.signin = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errormsg: errors.array()[0].msg,
    })
  }

  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        errormsg: "an error occured",
      })
    }
    if (!user) {
      return res.status(400).json({
        errormsg: "email not found",
      })
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        errormsg: "Wrong credentials",
      })
    }
    //creating token
    const token = jwt.sign({ id: user._id }, process.env.SECRET)
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 })
    //send response to frontend
    const { _id, firstname, lastname, email, role } = user
    res.status(200).json({
      token,
      data: {
        _id,
        firstname,
        lastname,
        email,
        role,
      },
    })
  })
}
