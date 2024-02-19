import { z } from "zod";
import { validate_sust_mail } from "../../lib/validation";

export const loginSchema = z.object({
	email: z
		.string()
		.email({ message: "Enter valid email." })
		.refine(
			(email) => {
				return validate_sust_mail(email);
			},
			{ message: "Enter a valid sust email." }
		),
	password: z
		.string()
		.min(4, { message: "Password must be at least 4 characters." }),
});

export const registerSchema = z
	.intersection(
		loginSchema,
		z.object({
			name: z
				.string()
				.min(3, { message: "Name must be at least 3 characters." }),
			role: z.enum(
				["store_manager", "dept_head", "teacher", "lab_assistant", "officials"],
				{
					errorMap: () => ({
						message: "Select a valid role",
					}),
				}
			),
			confirmPassword: z.string().optional(),
			isVerified: z.boolean().optional(),
			about: z.string().optional(),
			dp: z.string().optional(),
		})
	)
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
				path: ["confirmPassword"],
			});
		}
	});
