import { Router } from "express";
import express from "express";
import usersRouter from "./usersRouter.js"
import authRouter from "./authRouter.js"
import tutorialesRouter from "./tutorialesRouter.js";
import authController from "../controllers/authController/authController.js";

const router = express.Router({ mergeParams: true });

router.use("/users",authController.isAdmin,usersRouter);
router.use("/",authRouter);
router.use("/tutoriales",authController.isAdmin,tutorialesRouter);

export default router;