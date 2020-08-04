const { Order } = require("../models/order")

exports.getOrderByID = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          errormsg: "An error occured",
        })
      }
      req.order = order
      next()
    })
}
