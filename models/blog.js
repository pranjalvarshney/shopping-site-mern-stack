const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      max: 50,
    },
    tagline: {
      type: String,
      max: 100,
      trim: true,
    },
    content: {
      type: String,
      max: 3000,
    },
    picture: {
      data: Buffer,
      contentType: String,
    },
    like: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Blog", blogSchema)
