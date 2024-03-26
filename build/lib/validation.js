"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_transaction_body_partial = exports.validate_transaction_body = exports.validate_application_body_partial = exports.validate_application_body = exports.validate_product_body_partial = exports.validate_product_body = exports.validate_shelf_body_partial = exports.validate_shelf_body = exports.validate_login_body = exports.validate_registration_body = exports.validate_sust_mail = void 0;
const accounts_schema_1 = require("../schema/accounts/accounts.schema");
const application_schema_1 = require("../schema/application/application.schema");
const auth_schema_1 = require("../schema/auth/auth.schema");
const product_schema_1 = require("../schema/product/product.schema");
const shelf_schema_1 = require("../schema/shelf/shelf.schema");
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
const validate_shelf_body = (body) => {
    return shelf_schema_1.shelfSchema.parse(body);
};
exports.validate_shelf_body = validate_shelf_body;
const validate_shelf_body_partial = (body) => {
    return shelf_schema_1.shelfSchema.partial().parse(body);
};
exports.validate_shelf_body_partial = validate_shelf_body_partial;
const validate_product_body = (body) => {
    return product_schema_1.productSchema.parse(body);
};
exports.validate_product_body = validate_product_body;
const validate_product_body_partial = (body) => {
    return product_schema_1.productSchema.partial().parse(body);
};
exports.validate_product_body_partial = validate_product_body_partial;
const validate_application_body = (body) => {
    return application_schema_1.applicationSchema.parse(body);
};
exports.validate_application_body = validate_application_body;
const validate_application_body_partial = (body) => {
    return application_schema_1.applicationSchema.partial().parse(body);
};
exports.validate_application_body_partial = validate_application_body_partial;
const validate_transaction_body = (body) => {
    return accounts_schema_1.transactionSchema.parse(body);
};
exports.validate_transaction_body = validate_transaction_body;
const validate_transaction_body_partial = (body) => {
    return accounts_schema_1.transactionSchema.partial().parse(body);
};
exports.validate_transaction_body_partial = validate_transaction_body_partial;
