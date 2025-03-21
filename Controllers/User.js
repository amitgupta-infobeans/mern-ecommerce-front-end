import { UserModel } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// REGISTRATION API.
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const haspassword = await bcrypt.hash(password, 10);
    let user = await UserModel.create({ name, email, password: haspassword });
    res.status(201).json({
      success: true,
      message: "User Sucessfully registered.",
      data: user,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// LOGIN API
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid email" });
    }
    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ user: user }, process.env.SECRET_JWT_KEY, {
      expiresIn: "6000sec",  // for 10 min only.
    });
    res
      .status(200)
      .json({
        success: true,
        message: `Welcome ${user.name} `,
        token,
        data: user,
      });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// GET ALL USERS
export const users = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    if (!allUsers) {
      return res
        .status(404)
        .json({ success: false, message: "No record found." });
    }
    res
      .status(200)
      .json({ success: true, message: "fetched all users", data: allUsers });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
};
