const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true } //it gives the timestamp of the creation}
)

module.exports = mongoose.model("Category", categorySchema)
