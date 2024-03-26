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
exports.deleteApplication = exports.updateApplication = exports.getAllApplication = exports.createApplication = void 0;
const CustomError_1 = require("../custom-class/CustomError");
const db_client_1 = __importDefault(require("../db/db_client"));
const createApplication = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const application = yield db_client_1.default.application.create({
            data: Object.assign(Object.assign({}, body), { quantity: JSON.stringify(body.items), items: {
                    connect: body.items.map((item) => ({ id: item.id })),
                }, itemsId: body.items.map((item) => item.id) }),
            include: {
                items: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                applicant: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        dp: true,
                    },
                },
                applicationTo: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        dp: true,
                    },
                },
            },
        });
        return application;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.createApplication = createApplication;
const getAllApplication = ({ id, itemId, applicant, applicationTo, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield db_client_1.default.application.findMany({
            where: Object.assign(Object.assign(Object.assign(Object.assign({}, (id ? { id } : {})), (itemId ? { itemsId: { has: itemId } } : {})), (applicant ? { applicantId: applicant } : {})), (applicationTo ? { applicationToId: applicationTo } : {})),
            include: {
                items: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                applicant: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        dp: true,
                    },
                },
                applicationTo: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        dp: true,
                    },
                },
            },
        });
        return applications;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.getAllApplication = getAllApplication;
const updateApplication = ({ id, body, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const application = db_client_1.default.application.update({
            where: {
                id,
            },
            data: Object.assign({}, body),
            include: {
                items: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                applicant: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        dp: true,
                    },
                },
                applicationTo: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        dp: true,
                    },
                },
            },
        });
        return application;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.updateApplication = updateApplication;
const deleteApplication = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const application = db_client_1.default.application.delete({
            where: {
                id,
            },
        });
        return application;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.deleteApplication = deleteApplication;
