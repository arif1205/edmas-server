"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const default_controller_1 = __importDefault(require("../controller/default/default.controller"));
const defaultRouter = (0, express_1.Router)();
defaultRouter.get("/file", default_controller_1.default.getFile);
exports.default = defaultRouter;
