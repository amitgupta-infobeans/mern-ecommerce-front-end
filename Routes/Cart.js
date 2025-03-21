import express from "express";
import {
  addToCart,
  emptyCart,
  getUserCart,
  minusQtyOfProduct,
  removeProduct,
} from "../Controllers/Cart.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart); // ADD ITEM TO CART.
cartRouter.get("/user", getUserCart); // GET USER CART DATA.
cartRouter.post("/minusqty", minusQtyOfProduct); // MINUS PRODUCT QUANTITY.
cartRouter.get("/remove/:productId", removeProduct); // REMOVE PRODUCT FROM CART.
cartRouter.delete("/clear", emptyCart); //EMPTY CART IN ONE CLICK.

export default cartRouter;
