const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      unique: true,
      minlength: 1,
    },
  },
  { timestamps: true } //it gives the timestamp of the creation}
)

module.exports = mongoose.model("Category", categorySchema)
