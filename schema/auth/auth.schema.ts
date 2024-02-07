import { z } from "zod";
import { validateSustMail } from "../../lib/validation";

export const registerSchema = z
	.object({
		name: z.string().min(3, { message: "Name must be at least 3 characters." }),
		email: z
			.string()
			.email({ message: "Enter valid email." })
			.refine(
				(email) => {
					return validateSustMail(email);
				},
				{ message: "Enter a valid sust email." }
			),
		role: z.enum(
			["store_manager", "dept_head", "teacher", "lab_assistant", "officials"],
			{
				errorMap: () => ({
					message: "Select a valid role",
				}),
			}
		),
		password: z.string().min(6),
		confirmPassword: z.string().min(6).optional(),
		isVerified: z.boolean().optional(),
		about: z.string().optional(),
		dp: z.any().optional(),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
				path: ["confirmPassword"],
			});
		}
	});
