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
exports.check_auth = void 0;
const CustomError_1 = require("../custom-class/CustomError");
const token_1 = require("../lib/token");
const check_auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new CustomError_1.CustomError("Unauthorized", 401);
        }
        const verified = yield (0, token_1.verifyToken)(token);
        if (!verified) {
            throw new CustomError_1.CustomError("Unauthorized", 401);
        }
        const decoded = yield (0, token_1.decodeToken)(token);
        if (!decoded) {
            throw new CustomError_1.CustomError("Unauthorized", 401);
        }
        req.headers.user = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.check_auth = check_auth;
