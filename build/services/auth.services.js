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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const db_client_1 = __importDefault(require("../db/db_client"));
const CustomError_1 = require("../custom-class/CustomError");
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create user in database
        const user = db_client_1.default.user.create({
            data: body,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                about: true,
                dp: true,
                password: false,
            },
        });
        return user;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.createUser = createUser;
