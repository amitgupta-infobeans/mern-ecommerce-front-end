import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/UserRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7676;

app.use(express.json());

//User router:
app.use("/api/user/", userRouter);

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
