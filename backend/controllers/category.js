const Category = require("../models/category")
const category = require("../models/category")

exports.getCategoryByID = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        errormsg: "Category not found!",
      })
    }

    req.category = category
    next()
  })
}

exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body)
  newCategory.save((err, category) => {
    if (err) {
      return res.json({
        errormsg: "An error occured while creating a category",
      })
    }
    res.json(category)
  })
}
