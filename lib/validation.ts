import { registerSchema } from "../schema/auth/auth.schema";

export const validateSustMail = (email: string): boolean => {
	return /.*\.sust\.edu$/.test(email);
};

export const validateRegistrationBody = (body: any) => {
	return registerSchema.parse(body);
};
