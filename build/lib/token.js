"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.decodeToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const CustomError_1 = require("../custom-class/CustomError");
// generate jwt token
const generateToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.JWT_SECRET)
        return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
    else
        throw new CustomError_1.CustomError("Couldn't create token", 500);
});
exports.generateToken = generateToken;
// verify jwt token
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.JWT_SECRET)
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        else
            throw new CustomError_1.CustomError("Couldn't verify token", 500);
    }
    catch (err) {
        // ** if token is expired
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new CustomError_1.CustomError("Token expired", 401);
        }
        else {
            throw err;
        }
    }
});
exports.verifyToken = verifyToken;
// decode jwt token
const decodeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.decode(token);
});
exports.decodeToken = decodeToken;
