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
exports.deleteShelf = exports.updateShelf = exports.getAllShelf = exports.createShelf = void 0;
const CustomError_1 = require("../custom-class/CustomError");
const db_client_1 = __importDefault(require("../db/db_client"));
const createShelf = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shelf = db_client_1.default.shelf.create({
            data: body,
        });
        return shelf;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.createShelf = createShelf;
const getAllShelf = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shelfs = yield db_client_1.default.shelf.findMany({
            where: Object.assign({}, (id ? { id } : {})),
        });
        return shelfs;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.getAllShelf = getAllShelf;
const updateShelf = ({ id, body, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shelf = db_client_1.default.shelf.update({
            where: {
                id,
            },
            data: body,
        });
        return shelf;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.updateShelf = updateShelf;
const deleteShelf = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shelf = id
            ? db_client_1.default.shelf.delete({
                where: {
                    id,
                },
            })
            : db_client_1.default.shelf.deleteMany();
        return shelf;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.deleteShelf = deleteShelf;
