import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {userRouter,productRouter,cartRouter,addressRouter} from "./Routes/index.js";
import { Authenticated } from "./Middlewares/isAuthenticated.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7676;

app.use(express.json());

//USER ROUTER.
app.use("/api/user/", userRouter);

// PRODUCT ROUTER.
app.use("/api/product/", productRouter);

// CART ROUTER.
app.use("/api/cart/", Authenticated, cartRouter);

// ADDRESS ROUTER.
app.use("/api/address/", Authenticated, addressRouter);

// MIDDLEWARE TO HANDLE INVALID ROUTE OF API.
app.use("/*", (req, res) => {
  res.status(404).json({ success: false, message: "Invalid api path." });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected successfully...");
    app.listen(PORT, () => {
      console.log("App is running on PORT:", PORT);
    });
  })
  .catch((e) => {
    console.log(e.message());
  });
