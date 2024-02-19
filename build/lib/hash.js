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
exports.verifyPassword = exports.hashPassword = void 0;
const argon2_1 = __importDefault(require("argon2"));
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hash = yield argon2_1.default.hash(password);
            return hash;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.hashPassword = hashPassword;
function verifyPassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (yield argon2_1.default.verify(hash, password)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.verifyPassword = verifyPassword;
