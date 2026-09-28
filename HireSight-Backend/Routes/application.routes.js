import express from "express"
import { changeStatus, createApplication, deleteApplication, getApplications, updatedApplication } from "../Controllers/application.controller.js";
import { protect } from "../Middleware/authMiddleware.js";
let applicationRouter= express.Router();
// applicationRouter.use()

applicationRouter.route("/")
.get(protect, getApplications)
.post(protect, createApplication )

applicationRouter.delete("/:id", protect, deleteApplication);
applicationRouter.patch("/:id/status", protect, changeStatus);
applicationRouter.patch("/:id", protect, updatedApplication)


export default applicationRouter;