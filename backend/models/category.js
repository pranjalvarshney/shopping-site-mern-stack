const mongosse = require("mongoose")

const categorySchema = new mongosse.Schema(
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

module.exports = mongosse.model("Category", categorySchema)
