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
exports.delete_all_shelf_controller = void 0;
const CustomError_1 = require("../../custom-class/CustomError");
const validation_1 = require("../../lib/validation");
const shelf_services_1 = require("../../services/shelf.services");
const create_shelf_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req_body = req.body;
        const shelf_body = (0, validation_1.validate_shelf_body)(req_body);
        const shelf = yield (0, shelf_services_1.createShelf)(shelf_body);
        res.status(201).json({
            message: "Shelf created successfully.",
            data: shelf,
            status: 201,
        });
    }
    catch (err) {
        next(err);
    }
});
const get_all_shelf_controller = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shelfs = yield (0, shelf_services_1.getAllShelf)({});
        res.status(200).json({
            message: "All shelfs fetched successfully.",
            data: shelfs,
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
});
const get_all_shelf_by_id_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const shelfs = yield (0, shelf_services_1.getAllShelf)({ id });
        if (shelfs.length === 0) {
            throw new CustomError_1.CustomError("Shelf not found.", 404);
        }
        res.status(200).json({
            message: "Shelf fetched successfully.",
            data: shelfs[0],
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
});
const update_shelf_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req_body = req.body;
        const id = req.params.id;
        const shelf_body = (0, validation_1.validate_shelf_body_partial)(req_body);
        const shelf = yield (0, shelf_services_1.updateShelf)({ id, body: shelf_body });
        if (!shelf) {
            throw new CustomError_1.CustomError("Shelf could not update", 404);
        }
        res.status(202).json({
            message: "Shelf updated successfully.",
            data: shelf,
            status: 202,
        });
    }
    catch (err) {
        next(err);
    }
});
const delete_shelf_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id)
            throw new CustomError_1.CustomError("Shelf id is required", 400);
        const shelf = yield (0, shelf_services_1.deleteShelf)(id);
        if (!shelf) {
            throw new CustomError_1.CustomError("Shelf could not delete", 404);
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
const delete_all_shelf_controller = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _deletedShelfs = yield (0, shelf_services_1.deleteShelf)();
        res.status(202).json({
            message: "All shelf deleted successfully.",
            status: 202,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.delete_all_shelf_controller = delete_all_shelf_controller;
exports.default = {
    create_shelf_controller,
    get_all_shelf_controller,
    get_all_shelf_by_id_controller,
    update_shelf_controller,
    delete_shelf_controller,
    delete_all_shelf_controller: exports.delete_all_shelf_controller,
};
