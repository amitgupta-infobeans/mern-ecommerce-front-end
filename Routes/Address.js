import express from "express";
import { addAddress, getAddress } from "../Controllers/Address.js";

const addressRouter = express.Router();

addressRouter.post("/add", addAddress);
addressRouter.get("/user", getAddress);

export default addressRouter;
