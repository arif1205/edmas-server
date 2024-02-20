import { Router } from "express";
import authRouter from "./auth.router";
import defaultRouter from "./default.router";
import shelfRouter from "./shelf.router";
import { check_auth } from "../middleware/auth.middleware";
import { is_manager } from "../middleware/is_manager.middlware";
import productRouter from "./product.router";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/shelf", check_auth, is_manager, shelfRouter);
rootRouter.use("/product", check_auth, productRouter);
rootRouter.use("/default", check_auth, defaultRouter);

export default rootRouter;
