import { Router } from "express";
import express from "express";
import usersRouter from "./usersRouter.js"
import authRouter from "./authRouter.js"
import tutorialesRouter from "./tutorialesRouter.js";
import authController from "../controllers/authController/authController.js";

const router = express.Router({ mergeParams: true });

router.use("/users",usersRouter);
router.use("/",authRouter);
router.use("/tutoriales",tutorialesRouter);

export default router;