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
const lodash_1 = __importDefault(require("lodash"));
const CustomError_1 = require("../../custom-class/CustomError");
const validation_1 = require("../../lib/validation");
const application_services_1 = require("../../services/application.services");
const create_application_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req_body = req.body;
        const application_body = (0, validation_1.validate_application_body)(req_body);
        const application = yield (0, application_services_1.createApplication)(application_body);
        res.status(201).json({
            message: "Application created successfully.",
            data: Object.assign(Object.assign({}, application), { quantity: JSON.parse((application === null || application === void 0 ? void 0 : application.quantity) || null) }),
            status: 201,
        });
    }
    catch (err) {
        next(err);
    }
});
const get_all_application_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, itemId, applicant, applicationTo, } = req.query;
        const applications = yield (0, application_services_1.getAllApplication)({
            id,
            itemId,
            applicant,
            applicationTo,
        });
        res.status(200).json({
            message: "All applications fetched successfully.",
            count: applications.length,
            data: applications,
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
});
const get_application_by_id_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const application = yield (0, application_services_1.getAllApplication)({ id });
        if (application.length === 0) {
            throw new CustomError_1.CustomError("Application not found.", 404);
        }
        res.status(200).json({
            message: "Product fetched successfully.",
            data: application[0],
            status: 200,
        });
    }
    catch (err) {
        next(err);
    }
});
const update_application_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req_body = req.body;
        const id = req.params.id;
        const application_body = (0, validation_1.validate_application_body_partial)(req_body);
        lodash_1.default.omitBy(application_body, lodash_1.default.isNil);
        const application = yield (0, application_services_1.updateApplication)({
            id,
            body: application_body,
        });
        if (!application) {
            throw new CustomError_1.CustomError("Application could not update", 404);
        }
        res.status(202).json({
            message: "Application updated successfully.",
            data: application,
            status: 202,
        });
    }
    catch (err) {
        next(err);
    }
});
const delete_application_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id)
            throw new CustomError_1.CustomError("Application id is required", 400);
        const application = yield (0, application_services_1.deleteApplication)(id);
        if (!application) {
            throw new CustomError_1.CustomError("Application could not delete", 404);
        }
        res.status(202).json({
            message: "Application deleted successfully.",
            status: 202,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    create_application_controller,
    get_all_application_controller,
    get_application_by_id_controller,
    update_application_controller,
    delete_application_controller,
};
