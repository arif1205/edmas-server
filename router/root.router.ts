import { Router } from "express";
import authRouter from "./auth.router";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);

export default rootRouter;
