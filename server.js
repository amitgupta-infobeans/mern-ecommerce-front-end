import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/UserRouter.js";
import productRouter from "./Routes/ProductRouter.js";
import cartRouter from "./Routes/Cart.js";
import { Authenticated } from "./Middlewares/isAuthenticated.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7676;

app.use(express.json());

//User router.
app.use("/api/user/", userRouter);

// Product router.
app.use("/api/product/", productRouter);

// Cart router.
app.use("/api/cart/", Authenticated, cartRouter);

// middleware to handle invalid api request.
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
