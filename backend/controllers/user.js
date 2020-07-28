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
  req.profile.encryptedpassword = undefined
  req.profile.salt = undefined
  req.profile.updatedAt = undefined
  return res.json(req.profile)
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    {
      $set: req.body,
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, user) => {
      console.log(req.body)

      if (err) {
        return res.status(400).json({
          errormsg: "An error occured",
        })
      }
      user.encryptedpassword = undefined
      user.salt = undefined
      user.updatedAt = undefined
      return res.json(user)
    }
  )
}

// exports.getAllUsers = (req, res) => {
//   User.find().exec((err, users) => {
//     if (err) {
//       return res.status(400).json({
//         errormsg: "An error occured",
//       })
//     }
//     if (!users) {
//       return res.status(400).json({
//         errormsg: "User not found",
//       })
//     }
//     return res.json(users)
//   })
// }
