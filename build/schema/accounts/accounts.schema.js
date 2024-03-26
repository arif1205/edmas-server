"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchemaPartial = exports.transactionSchema = void 0;
const zod_1 = require("zod");
exports.transactionSchema = zod_1.z.object({
    type: zod_1.z.enum(["income", "expense"]),
    details: zod_1.z.string(),
    amount: zod_1.z.string().refine((val) => !isNaN(parseFloat(val)), {
        message: "Amount must be a number",
    }),
});
exports.transactionSchemaPartial = exports.transactionSchema.partial();
