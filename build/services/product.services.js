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
exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.createProduct = void 0;
const CustomError_1 = require("../custom-class/CustomError");
const db_client_1 = __importDefault(require("../db/db_client"));
const createProduct = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = db_client_1.default.items.create({
            data: Object.assign(Object.assign({}, body), { image: body.image || "", quantity: Number(body.quantity), location: {
                    connect: {
                        id: body.location,
                    },
                } }),
            include: {
                location: true,
            },
        });
        return product;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.createProduct = createProduct;
const getAllProducts = ({ id, name, location, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db_client_1.default.items.findMany({
            where: Object.assign(Object.assign(Object.assign({}, (id ? { id } : {})), (name ? { name: { contains: name } } : {})), (location ? { locationId: location } : {})),
            include: {
                location: true,
            },
        });
        return products;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.getAllProducts = getAllProducts;
const updateProduct = ({ id, body, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = db_client_1.default.items.update({
            where: {
                id,
            },
            data: Object.assign({}, body),
            include: {
                location: true,
            },
        });
        return product;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = db_client_1.default.items.delete({
            where: {
                id,
            },
        });
        return product;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.deleteProduct = deleteProduct;
