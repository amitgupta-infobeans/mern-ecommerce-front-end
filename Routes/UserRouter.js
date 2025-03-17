import express from "express";
import { login, register, users } from "../Controllers/User.js";

const userRouter = express();

//register user.
userRouter.post("/register", register);

// login user.
userRouter.post("/login", login);

// get all users.
userRouter.get("/all", users);

export default userRouter;
