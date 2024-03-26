"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shelfSchemaPartial = exports.shelfSchema = void 0;
const zod_1 = require("zod");
exports.shelfSchema = zod_1.z.object({
    shelfNum: zod_1.z.string(),
});
exports.shelfSchemaPartial = exports.shelfSchema.partial();
