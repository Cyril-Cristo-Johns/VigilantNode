import express from "express";
import { sendJobDescription } from "../Controllers/ai.controller.js";
import { protect } from "../Middleware/authMiddleware.js";

let ai_Router= express.Router();

ai_Router.post("/analyze-job", protect,  sendJobDescription);


export default ai_Router;