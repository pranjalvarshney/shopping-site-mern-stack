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
  const { name, email, password } = req.body
  const newUser = new User({ name, email, password })
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
        errormsg: "An error occured",
      })
    }
    if (!user) {
      return res.status(400).json({
        errormsg: "Email not found",
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
    const { _id, name, email, role } = user
    res.status(200).json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      },
    })
  })
}

exports.signout = (req, res) => {
  res.clearCookie("token")
  return res.json({
    msg: "User successfully signed out",
  })
}

// for protected routes --
exports.isSignedIn = expressJWT({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
})

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
  // console.log(req.profile)
  // console.log(req.auth)
  let check = req.profile && req.auth && req.profile._id == req.auth.id
  if (!check) {
    return res.status(403).json({
      errormsg: "Access denied",
    })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      errormsg: "Access denied - admin creds not found",
    })
  }
  next()
}
