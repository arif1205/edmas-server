"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationSchemaPartial = exports.applicationSchema = void 0;
const zod_1 = require("zod");
exports.applicationSchema = zod_1.z.object({
    applicantId: zod_1.z.string(),
    applicationToId: zod_1.z.string(),
    type: zod_1.z.enum(["give", "take"]),
    subject: zod_1.z.string(),
    body: zod_1.z.string(),
    items: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string(),
        quantity: zod_1.z.number().min(1),
    }))
        .min(1),
    status: zod_1.z.enum(["Pending", "Approved"]).default("Pending"),
    phase: zod_1.z.enum([
        "sent_to_store_manager",
        "sent_to_head",
        "approved_by_head",
        "approved_by_store_manager",
    ]),
});
exports.applicationSchemaPartial = exports.applicationSchema.partial();
