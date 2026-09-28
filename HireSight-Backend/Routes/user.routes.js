import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { deleteAccount, updatePassword, userLogin, userRegister } from "../Controllers/user.controller.js";

let user_route= express.Router();

user_route.post("/register", userRegister);
user_route.post("/login", userLogin);
user_route.put("/password", protect, updatePassword );
user_route.delete("/account", protect, deleteAccount);


export default user_route;