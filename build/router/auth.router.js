"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth/auth.controller"));
const multer_config_1 = __importDefault(require("../config/multer.config"));
const authRouter = (0, express_1.Router)();
authRouter.post("/register", multer_config_1.default.single("dp"), auth_controller_1.default.register);
authRouter.post("/login", auth_controller_1.default.login);
exports.default = authRouter;
