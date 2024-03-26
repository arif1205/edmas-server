"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shelf_controller_1 = __importDefault(require("../controller/shelf/shelf.controller"));
const shelfRouter = (0, express_1.Router)();
shelfRouter.get("/get-all", shelf_controller_1.default.get_all_shelf_controller);
shelfRouter.get("/get-by-id/:id", shelf_controller_1.default.get_all_shelf_by_id_controller);
shelfRouter.post("/create", shelf_controller_1.default.create_shelf_controller);
shelfRouter.patch("/update/:id", shelf_controller_1.default.update_shelf_controller);
shelfRouter.delete("/delete/:id", shelf_controller_1.default.delete_shelf_controller);
shelfRouter.delete("/delete-all", shelf_controller_1.default.delete_all_shelf_controller);
exports.default = shelfRouter;
