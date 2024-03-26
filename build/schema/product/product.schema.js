"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchemaPartial = exports.productSchema = void 0;
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string(),
    quantity: zod_1.z.string().refine((val) => Number(val) && Number(val) >= 0, {
        message: "Quantity can not be less than 0",
    }),
    location: zod_1.z.string(),
    image: zod_1.z.string().optional(),
});
exports.productSchemaPartial = exports.productSchema.partial();
