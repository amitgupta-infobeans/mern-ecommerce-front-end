import mongoose from "mongoose";
import validator from "validator";
const PRODUCT_CATEGORY = [
  "mobile",
  "tablet",
  "laptop",
  "home",
  "tv",
  "furniture",
  "fashion",
];
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is required field"],
  },
  desc: {
    type: String,
    default:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
  },
  picture: {
    type: String,
    default: "https://dummyimage.com/300x250&text=Product+Image",
  },
  price: {
    type: Number,
    required: [true, "product price is required field"],
  },
  qty: {
    type: Number,
    required: [true, "product qty is required field"],
  },
  category: {
    type: String,
    required: [true, "product category is required field"],
    validate(value) {
      if (!PRODUCT_CATEGORY.includes(value)) {
        throw new Error("invalid product category.");
      }
    },
  },
  createdAt: { type: Date, default: Date.now },
});

export const ProductModel = new mongoose.model("Product", ProductSchema);
