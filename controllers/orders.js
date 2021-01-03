const { Order } = require("../models/order")

// middleware to give req.order

exports.getOrderByID = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price _id")
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

exports.getAllOrdersByUser = (req, res) => {
  Order.find({user: req.profile._id})
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          errormsg: "No orders found!",
        })
      }
      // const a = orders.filter(order=> order.user === req.profile._id)
      orders.map(order=>{
        if(req.profile._id === order.user){
          return order
        }
      })
      res.json(orders)
    })
}

// get all orders if admin and populating the user name and id

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name email")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          errormsg: "No orders found!",
        })
      }
      res.json(order)
    })
}
exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path("status").enumValues)
  // return res.json(req.order.status)
}

exports.updateOrderStatus = (req, res) => {
  Order.update(
    {
      _id: req.body.orderID,
    },
    {
      $set: { status: req.body.status },
    },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          errormsg: "Ccannot update order Status",
        })
      }
      res.json(order)
    }
  )
}
