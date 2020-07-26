const User = require("../models/user")

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured",
      })
    }
    if (!user) {
      return res.status(400).json({
        errormsg: "User not found",
      })
    }
    req.profile = user
    next()
  })
}

exports.getUser = (req, res) => {
  //TODO: get back here for password
  return res.json(req.profile)
}
