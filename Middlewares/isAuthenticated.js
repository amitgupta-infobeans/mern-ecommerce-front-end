import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../Models/User.js";
dotenv.config();

export const Authenticated = async (req, res, next) => {
  try {
    const token = req.header("Auth");
    if (!token) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const { _id } = decodeToken.user;
    let checkUserExist = await UserModel.findById(_id);
    if (!checkUserExist) {
      return res
        .status(404)
        .json({ success: false, message: "User not exist!!!" });
    }
    req.userId = checkUserExist._id.toString();
    next();
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};
