"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status, name) {
        super(message);
        this.status = status;
        this.name = name || "CustomError";
    }
}
exports.CustomError = CustomError;
