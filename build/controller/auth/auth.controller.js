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
const lodash_1 = require("lodash");
const CustomError_1 = require("../../custom-class/CustomError");
const hash_1 = require("../../lib/hash");
const token_1 = require("../../lib/token");
const validation_1 = require("../../lib/validation");
const auth_services_1 = require("../../services/auth.services");
const user_services_1 = require("../../services/user.services");
const cloudinary_1 = require("cloudinary");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const req_body = req.body;
        const user_body = (0, validation_1.validate_registration_body)(req_body);
        // ** upload dp in cloudinary
        let file_url = "";
        if (req.file) {
            yield cloudinary_1.v2.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path, function (error, result) {
                if (error) {
                    throw error;
                }
                file_url = result === null || result === void 0 ? void 0 : result.url;
            });
        }
        user_body === null || user_body === void 0 ? true : delete user_body.confirmPassword;
        user_body.password = yield (0, hash_1.hashPassword)(user_body.password);
        const user = yield (0, auth_services_1.createUser)(Object.assign(Object.assign({}, user_body), { dp: file_url }));
        res.status(201).json({
            message: "User registered successfully.",
            data: user,
            status: 201,
        });
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential_body = req.body;
        const user = yield (0, user_services_1.get_user_by_email)(credential_body.email);
        if (!user) {
            throw {
                status: 401,
                message: "Invalid credentials.",
            };
        }
        // compare password
        const is_valid = yield (0, hash_1.verifyPassword)(credential_body.password, user.password);
        if (!is_valid) {
            throw new CustomError_1.CustomError("Invalid credentials.", 401);
        }
        // delete password
        const res_user = (0, lodash_1.omit)(user, "password");
        // generate token
        const token = yield (0, token_1.generateToken)(res_user);
        res.status(200).json({
            message: "User logged in successfully.",
            data: res_user,
            token,
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = { register, login };
