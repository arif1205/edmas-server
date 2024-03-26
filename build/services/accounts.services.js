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
exports.delete_transaction_service = exports.update_transaction_service = exports.get_all_transaction_service = exports.get_current_balance_service = exports.createTransaction = void 0;
const CustomError_1 = require("../custom-class/CustomError");
const db_client_1 = __importDefault(require("../db/db_client"));
const createTransaction = (body) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const account = yield db_client_1.default.account.findMany();
        let new_account;
        if (account.length === 0) {
            // create account
            new_account = yield db_client_1.default.account.create({
                data: {
                    balance: 0,
                },
            });
        }
        const _transaction = db_client_1.default.transaction.create({
            data: Object.assign(Object.assign(Object.assign({}, body), { amount: parseFloat(body.amount) }), (body.documents
                ? {
                    documents: {
                        createMany: {
                            data: (_a = body.documents) === null || _a === void 0 ? void 0 : _a.map((doc) => ({
                                content: doc,
                            })),
                        },
                    },
                }
                : {})),
            include: {
                documents: true,
            },
        });
        const _update_account = db_client_1.default.account.update({
            where: {
                id: (new_account === null || new_account === void 0 ? void 0 : new_account.id) || ((_b = account[0]) === null || _b === void 0 ? void 0 : _b.id),
            },
            data: {
                balance: Object.assign({}, (body.type === "income"
                    ? { increment: parseFloat(body.amount) }
                    : { decrement: parseFloat(body.amount) })),
            },
        });
        const [transaction, update_account] = yield db_client_1.default.$transaction([
            _transaction,
            _update_account,
        ]);
        return Object.assign(Object.assign({}, transaction), { current_balance: update_account.balance });
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.createTransaction = createTransaction;
const get_current_balance_service = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield db_client_1.default.account.findMany();
        return account.length > 0 ? account[0] : { message: "No account found" };
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.get_current_balance_service = get_current_balance_service;
const get_all_transaction_service = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tnx = yield db_client_1.default.transaction.findMany({
            include: {
                documents: true,
            },
        });
        return tnx;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.get_all_transaction_service = get_all_transaction_service;
const update_transaction_service = ({ id, body, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const update_doc = ((_c = body === null || body === void 0 ? void 0 : body.documents) === null || _c === void 0 ? void 0 : _c.length) > 0 &&
            (yield db_client_1.default.document.deleteMany({
                where: {
                    transactionId: id,
                },
            }));
        const tnx = yield db_client_1.default.transaction.update({
            where: {
                id,
            },
            data: Object.assign(Object.assign({}, body), (body.documents && update_doc
                ? {
                    documents: {
                        update: {
                            data: (_d = body.documents) === null || _d === void 0 ? void 0 : _d.map((doc) => ({
                                content: doc,
                            })),
                        },
                    },
                }
                : {})),
            include: {
                documents: true,
            },
        });
        return tnx;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.update_transaction_service = update_transaction_service;
const delete_transaction_service = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tnx = db_client_1.default.transaction.delete({
            where: {
                id,
            },
        });
        return tnx;
    }
    catch (err) {
        throw new CustomError_1.CustomError(err === null || err === void 0 ? void 0 : err.message, 500);
    }
});
exports.delete_transaction_service = delete_transaction_service;
