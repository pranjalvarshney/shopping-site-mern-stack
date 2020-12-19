const mongoose = require("mongoose")

const CartProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    max: 10,
    min: 1,
  },
  price: Number,
})
const CartProduct = mongoose.model("CartProduct", CartProductSchema)

const orderSchema = new mongoose.Schema(
  {
    products: [CartProductSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      default: "Placed",
      enum: [
        "Cancelled",
        "Placed",
        "Processing",
        "Shipped",
        "On the way",
        "Delivered",
      ],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    updated: Date,
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = {
  Order,
  CartProduct,
}
