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
const CustomError_1 = require("../../custom-class/CustomError");
const validation_1 = require("../../lib/validation");
const product_services_1 = require("../../services/product.services");
const lodash_1 = __importDefault(require("lodash"));
const create_product_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const req_body = req.body;
        const product_body = (0, validation_1.validate_product_body)(req_body);
        // ** upload image if available
        let file_url = "";
        if (req.file) {
            yield cloudinary_1.v2.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path, function (error, result) {
                if (error) {
                    throw error;
                }
                file_url = result === null || result === void 0 ? void 0 : result.url;
            });
        }
        const product = yield (0, product_services_1.createProduct)(Object.assign(Object.assign({}, product_body), { image: file_url }));
        res.status(201).json({
            message: "Product created successfully.",
            data: product,
            status: 201,
        });
    }
    catch (err) {
        next(err);
    }
});
const get_all_product_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location, } = req.query;
        const products = yield (0, product_services_1.getAllProducts)({ name, location });
        res.status(200).json({
            message: "All products fetched successfully.",
            data: products,
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
});
const get_all_product_by_id_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield (0, product_services_1.getAllProducts)({ id });
        if (product.length === 0) {
            throw new CustomError_1.CustomError("Product not found.", 404);
        }
        res.status(200).json({
            message: "Product fetched successfully.",
            data: product[0],
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
});
const update_product_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const req_body = req.body;
        const id = req.params.id;
        const product_body = (0, validation_1.validate_product_body_partial)(req_body);
        lodash_1.default.omitBy(product_body, lodash_1.default.isNil);
        // ** upload image if available
        let file_url = "";
        if (req.file) {
            yield cloudinary_1.v2.uploader.upload((_b = req.file) === null || _b === void 0 ? void 0 : _b.path, function (error, result) {
                if (error) {
                    throw error;
                }
                file_url = result === null || result === void 0 ? void 0 : result.url;
            });
        }
        const product = yield (0, product_services_1.updateProduct)({
            id,
            body: Object.assign(Object.assign(Object.assign(Object.assign({}, product_body), (product_body.quantity
                ? { quantity: Number(product_body.quantity) }
                : {})), (file_url ? { image: file_url } : {})), (product_body.location
                ? {
                    location: {
                        connect: {
                            id: product_body.location,
                        },
                    },
                }
                : {})),
        });
        if (!product) {
            throw new CustomError_1.CustomError("Product could not update", 404);
        }
        res.status(202).json({
            message: "Product updated successfully.",
            data: product,
            status: 202,
        });
    }
    catch (err) {
        next(err);
    }
});
const delete_product_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id)
            throw new CustomError_1.CustomError("Product id is required", 400);
        const product = yield (0, product_services_1.deleteProduct)(id);
        if (!product) {
            throw new CustomError_1.CustomError("Product could not delete", 404);
        }
        res.status(202).json({
            message: "Shelf deleted successfully.",
            status: 202,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    create_product_controller,
    get_all_product_controller,
    get_all_product_by_id_controller,
    update_product_controller,
    delete_product_controller,
};
