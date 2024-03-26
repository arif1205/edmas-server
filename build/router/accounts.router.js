"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounts_controller_1 = __importDefault(require("../controller/accounts/accounts.controller"));
const multer_config_1 = __importDefault(require("../config/multer.config"));
const accountsRouter = (0, express_1.Router)();
accountsRouter.get("/get-current-balance", accounts_controller_1.default.get_current_balance);
accountsRouter.get("/get-all-transaction", accounts_controller_1.default.get_all_transaction_controller);
accountsRouter.post("/create", multer_config_1.default.array("documents", 5), accounts_controller_1.default.create_transaction_controller);
// accountsRouter.patch(
// 	"/update/:id",
// 	upload.array("documents", 5),
// 	accountsController.update_transaction_controller
// );
// accountsRouter.delete(
// 	"/delete/:id",
// 	accountsController.delete_transaction_controller
// );
exports.default = accountsRouter;
