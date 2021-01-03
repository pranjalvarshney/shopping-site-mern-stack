const User = require("../models/user")
const Order = require("../models/order")

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

exports.getUserPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name ")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          errormsg: "An error occured",
        })
      }
      return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = []
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    })
  })
  //store in database
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true,useFindAndModify:false },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          errormsg: "Unable to save... An error occured",
        })
      }
    }
  )
  next()
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
