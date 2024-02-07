import { Router } from "express";
import authRouter from "./auth.router";
import defaultRouter from "./default.router";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/default", defaultRouter);

export default rootRouter;
