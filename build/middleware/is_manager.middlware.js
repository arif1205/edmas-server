"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_manager = void 0;
const CustomError_1 = require("../custom-class/CustomError");
const is_manager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = JSON.parse(JSON.stringify(req.headers.user)).role;
        if (!role || (role !== "store_manager" && role !== "dept_head")) {
            throw new CustomError_1.CustomError("Unauthorized", 401);
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.is_manager = is_manager;
