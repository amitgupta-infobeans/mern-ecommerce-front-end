import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7676;

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
