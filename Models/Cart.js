import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  name: {
    type: String,
    required: [true, "product name is required field"],
  },
  picture: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "product price is required field"],
  },
  qty: {
    type: Number,
    required: [true, "product qty is required field"],
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [CartItemSchema],
  createdAt:{type:Date, default:Date.now}
});

export const CartModel = mongoose.model("Cart", CartSchema);
