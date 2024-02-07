import { Router } from "express";
import defaultController from "../controller/default/default.controller";

const defaultRouter = Router();

defaultRouter.get("/file", defaultController.getFile);

export default defaultRouter;
