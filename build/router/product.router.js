"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product/product.controller"));
const is_manager_middlware_1 = require("../middleware/is_manager.middlware");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const productRouter = (0, express_1.Router)();
productRouter.get("/get-all", product_controller_1.default.get_all_product_controller);
productRouter.get("/get-by-id/:id", product_controller_1.default.get_all_product_by_id_controller);
productRouter.post("/create", is_manager_middlware_1.is_manager, multer_config_1.default.single("image"), product_controller_1.default.create_product_controller);
productRouter.patch("/update/:id", is_manager_middlware_1.is_manager, multer_config_1.default.single("image"), product_controller_1.default.update_product_controller);
productRouter.delete("/delete/:id", is_manager_middlware_1.is_manager, product_controller_1.default.delete_product_controller);
exports.default = productRouter;
