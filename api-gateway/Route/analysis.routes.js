import express from "express";
import { getAnalysis } from "../controllers/analyse.controller.js";

const analyseRouter= express.Router();

analyseRouter.get("/api/analyse/", getAnalysis )


export default analyseRouter;