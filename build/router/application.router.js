"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const application_controller_1 = __importDefault(require("../controller/application/application.controller"));
const is_manager_middlware_1 = require("../middleware/is_manager.middlware");
const applicationRouter = (0, express_1.Router)();
applicationRouter.get("/get-all", application_controller_1.default.get_all_application_controller);
applicationRouter.get("/get-by-id/:id", application_controller_1.default.get_application_by_id_controller);
applicationRouter.post("/create", application_controller_1.default.create_application_controller);
applicationRouter.patch("/update/:id", is_manager_middlware_1.is_manager, application_controller_1.default.update_application_controller);
applicationRouter.delete("/delete/:id", is_manager_middlware_1.is_manager, application_controller_1.default.delete_application_controller);
exports.default = applicationRouter;
