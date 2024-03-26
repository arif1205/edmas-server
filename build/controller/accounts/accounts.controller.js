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
const cloudinary_1 = require("cloudinary");
const lodash_1 = __importDefault(require("lodash"));
const CustomError_1 = require("../../custom-class/CustomError");
const validation_1 = require("../../lib/validation");
const accounts_services_1 = require("../../services/accounts.services");
const create_transaction_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const req_body = req.body;
        const transaction_body = (0, validation_1.validate_transaction_body)(req_body);
        const files = req.files;
        let file_urls = [];
        if (files) {
            for (let i = 0; i < (files === null || files === void 0 ? void 0 : files.length); i++) {
                yield cloudinary_1.v2.uploader.upload((_a = files[i]) === null || _a === void 0 ? void 0 : _a.path, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    file_urls.push(result === null || result === void 0 ? void 0 : result.url);
                });
            }
        }
        const transaction = yield (0, accounts_services_1.createTransaction)(Object.assign(Object.assign({}, transaction_body), { documents: file_urls }));
        res.status(201).json({
            message: "Transanction created successfully.",
            data: transaction,
            status: 201,
        });
    }
    catch (err) {
        next(err);
    }
});
const get_current_balance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const curr_balance = yield (0, accounts_services_1.get_current_balance_service)();
        res.status(200).json({
            message: "Current balance fetched successfully.",
            data: curr_balance,
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
});
const get_all_transaction_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tnx = yield (0, accounts_services_1.get_all_transaction_service)();
        if (tnx.length === 0) {
            throw new CustomError_1.CustomError("Transactions not found.", 404);
        }
        res.status(200).json({
            message: "Transactions fetched successfully.",
            data: tnx,
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
});
const update_transaction_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const req_body = req.body;
        const id = req.params.id;
        const transaction_body = (0, validation_1.validate_transaction_body_partial)(req_body);
        lodash_1.default.omitBy(transaction_body, lodash_1.default.isNil);
        const files = req.files;
        let file_urls = [];
        if (files) {
            for (let i = 0; i < (files === null || files === void 0 ? void 0 : files.length); i++) {
                yield cloudinary_1.v2.uploader.upload((_b = files[i]) === null || _b === void 0 ? void 0 : _b.path, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    file_urls.push(result === null || result === void 0 ? void 0 : result.url);
                });
            }
        }
        const tnx = yield (0, accounts_services_1.update_transaction_service)({
            id,
            body: Object.assign(Object.assign({}, transaction_body), { documents: file_urls }),
        });
        if (!tnx) {
            throw new CustomError_1.CustomError("Transaction could not update", 404);
        }
        res.status(202).json({
            message: "Transaction updated successfully.",
            data: tnx,
            status: 202,
        });
    }
    catch (err) {
        next(err);
    }
});
const delete_transaction_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id)
            throw new CustomError_1.CustomError("Transaction id is required", 400);
        const tnx = yield (0, accounts_services_1.delete_transaction_service)(id);
        if (!tnx) {
            throw new CustomError_1.CustomError("Transaction could not delete", 404);
        }
        res.status(202).json({
            message: "Transaction deleted successfully.",
            status: 202,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    create_transaction_controller,
    get_current_balance,
    get_all_transaction_controller,
    update_transaction_controller,
    delete_transaction_controller,
};
