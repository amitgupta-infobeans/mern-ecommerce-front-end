import {
  addProduct,
  editProduct,
  getAllProduct,
  getOneProduct,
  deleteProduct,
} from "../Controllers/Product.js";
import express from "express";

const productRouter = express.Router();

productRouter.post("/add", addProduct); // ADD PRODUCT.
productRouter.put("/:id", editProduct); // EDIT PRODUCT.
productRouter.get("/all", getAllProduct); // GET ALL PRODUCTS.
productRouter.get("/:id", getOneProduct); // GET ONE PRODUCT.
productRouter.delete("/:id", deleteProduct); // DELETE PRODUCT BY ID.

export default productRouter;
