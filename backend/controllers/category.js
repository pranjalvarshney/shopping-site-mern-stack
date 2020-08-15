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
      return res.status(400).json({
        errormsg: "An error occured while creating a category",
      })
    }
    res.json(category)
  })
}

exports.getCategory = (req, res) => {
  return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured in fetching all categories",
      })
    }
    return res.json(categories)
  })
}

exports.updateCategory = (req, res) => {
  Category.findOneAndUpdate(
    {
      _id: req.category._id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, updatedCategory) => {
      if (err) {
        return res.status(400).json({
          errormsg: "An error occured... Unable to update the category",
        })
      }
      return res.json(updatedCategory)
    }
  )
}

exports.removeCategory = (req, res) => {
  const category = req.category
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured... Unable to delete the category",
      })
    }
    res.json({
      msg: "Category has been deleted successfully",
    })
  })
}
