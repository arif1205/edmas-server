"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_login_body = exports.validate_registration_body = exports.validate_sust_mail = void 0;
const auth_schema_1 = require("../schema/auth/auth.schema");
const validate_sust_mail = (email) => {
    return /.*\.sust\.edu$/.test(email);
};
exports.validate_sust_mail = validate_sust_mail;
const validate_registration_body = (body) => {
    return auth_schema_1.registerSchema.parse(body);
};
exports.validate_registration_body = validate_registration_body;
const validate_login_body = (body) => {
    return auth_schema_1.loginSchema.parse(body);
};
exports.validate_login_body = validate_login_body;
