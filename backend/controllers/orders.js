const { Order } = require("../models/order")

// middleware to give req.order

exports.getOrderByID = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          errormsg: "An error occured, no order found in db",
        })
      }
      req.order = order
      next()
    })
}

// creating a order

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile
  const order = new Order(req.body.order)
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        errormsg: "Failed to save your order!",
      })
    }
    res.json(order)
  })
}

// get all orders if admin and populating the user name and id

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          errormsg: "No orders found!",
        })
      }
      res.json(order)
    })
}
