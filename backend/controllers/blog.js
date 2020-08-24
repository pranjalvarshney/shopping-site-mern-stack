const Blog = require("../models/blog")
const formidable = require("formidable")
const fs = require("fs")

exports.getBlogByID = (req, res, next, id) => {
  Blog.findById(id).exec((err, blog) => {
    if (err) {
      res.status(400).json({
        errormsg: "An error occured! NOT FOUND",
      })
    }
    req.blog = blog
    next()
  })
}

exports.getBlog = (req, res) => {
  return res.json(req.blog)
}

exports.getBlogs = (req, res) => {
  Blog.find().exec((err, blogs) => {
    if (err) {
      res.status(400).json({
        errormsg: "An error occured! NOT FOUND",
      })
    }
    res.json(blogs)
  })
}

exports.createBlog = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        errormsg: "An error occured! must be a problem with image",
      })
    }

    //handling fields
    const { title, tagline, content } = fields
    if (!title || !tagline || !content) {
      return res.status(400).json({
        errormsg: "Please provide all the relevant details",
      })
    }

    let blog = new Blog(fields)

    // handling the file
    if (file.picture) {
      if (file.picture > 5 * 1024 * 1024) {
        return res.status(400).json({
          errormsg: "Image size too big",
        })
      }
      blog.picture.data = fs.readFileSync(file.picture.path)
      blog.picture.contentType = file.picture.type
    }

    //saving into the database

    blog.save((err, blog) => {
      if (err) {
        return res.status(400).json({
          errormsg: "Error saving into the database! Try again!",
        })
      }
      res.json(blog)
    })
  })
}
