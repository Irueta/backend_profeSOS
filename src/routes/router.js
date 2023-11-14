import { Router } from "express";
import express from "express";
import usersRouter from "./usersRouter.js"
import authRouter from "./authRouter.js"


const router = express.Router({ mergeParams: true });

router.use("/users",usersRouter);
router.use("/",authRouter);


export default router;