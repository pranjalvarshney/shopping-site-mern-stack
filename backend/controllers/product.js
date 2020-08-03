const Product = require("../models/product")
const formidable = require("formidable") // to handle formdata
const _ = require("lodash") // makes javascript work easier
const fs = require("fs") //file system

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

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, (err, fields, file) => {
    //handling err
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured! must be a problem with image",
      })
    }
    // handling fields

    const { name, description, price, category, totalStock } = fields
    if (!name || !description || !price || !category || !totalStock) {
      return res.status(400).json({
        errormsg: "Please provide all the relevant details",
      })
    }

    let newProduct = new Product(fields)

    //handling file
    if (file.pimage) {
      if (file.pimage > 2 * 1024 * 1024) {
        return res.status(400).json({
          errormsg: "File size is too big",
        })
      }
      newProduct.pimage.data = fs.readFileSync(file.pimage.path)
      newProduct.pimage.contentType = file.pimage.type
    }
    // save to database

    newProduct.save((err, product) => {
      if (err) {
        return res.status(400).json({
          errormsg: "An error occured! While saving - Failed",
        })
      }
      res.json(product)
    })
  })
}

exports.getProduct = (req, res) => {
  // since the product image will take a lot of time,
  // for performance it is set undefined so that the json data is sent quick, while for the image,
  // a separate middleware is created to send the image
  req.product.pimage = undefined
  return res.json(req.product)
}

// middleware for product image for efficiency and performance
exports.getProductImage = (req, res, next) => {
  if (req.product.pimage) {
    res.set("Content-Type", req.product.pimage.contentType)
    res.send(req.product.pimage.data)
  }
  next()
}

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured! must be a problem with image",
      })
    }

    let product = req.product
    product = _.extend(product, fields)

    if (file.pimage) {
      if (file.pimage.size > 2 * 1024 * 1024) {
        res.status(400).json({
          errormsg: "Image size too big",
        })
      }
      product.pimage.data = fs.readFileSync(file.pimage.path)
      product.pimage.contentType = file.pimage.type
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          errormsg: "An error occured! While updating - Failed",
        })
      }
      res.json(product)
    })
  })
}

exports.removeProduct = (req, res) => {
  let product = req.product
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.json({
        errormsg: "An error occured! Failed to delete the product",
      })
    }
    res.json({
      msg: "Product has been deleted successfully",
      deletedProduct,
    })
  })
}
