import { Router } from "express";
import authController from "../controller/auth/auth.controller";
import upload from "../config/multer.config";

const authRouter = Router();

authRouter.post("/register", upload.single("dp"), authController.register);
authRouter.post("/login", authController.login);

export default authRouter;
