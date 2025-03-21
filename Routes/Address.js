import express from "express";
import {
  addAddress,
  deleteAddress,
  getAddress,
} from "../Controllers/Address.js";

const addressRouter = express.Router();

addressRouter.post("/add", addAddress);
addressRouter.get("/user", getAddress);
addressRouter.delete("/:addressId", deleteAddress);

export default addressRouter;
