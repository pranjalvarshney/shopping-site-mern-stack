const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    pimage: {
      data: Buffer,
      contentType: String,
    },
    occasions: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)
