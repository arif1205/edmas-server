"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
const validation_1 = require("../../lib/validation");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "Enter valid email." })
        .refine((email) => {
        return (0, validation_1.validate_sust_mail)(email);
    }, { message: "Enter a valid sust email." }),
    password: zod_1.z
        .string()
        .min(4, { message: "Password must be at least 4 characters." }),
});
exports.registerSchema = zod_1.z
    .intersection(exports.loginSchema, zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, { message: "Name must be at least 3 characters." }),
    role: zod_1.z.enum(["store_manager", "dept_head", "teacher", "lab_assistant", "officials"], {
        errorMap: () => ({
            message: "Select a valid role",
        }),
    }),
    confirmPassword: zod_1.z.string().optional(),
    isVerified: zod_1.z.boolean().optional(),
    about: zod_1.z.string().optional(),
    dp: zod_1.z.string().optional(),
}))
    .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["confirmPassword"],
        });
    }
});
