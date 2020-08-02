const Product = require("../models/product")

exports.getProductByID = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured!",
      })
    }
    if (!product) {
      return res.status(400).json({
        errormsg: "Product not found!",
      })
    }
    req.product = product
    next()
  })
}
