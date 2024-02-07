import { loginSchema, registerSchema } from "../schema/auth/auth.schema";

export const validate_sust_mail = (email: string): boolean => {
	return /.*\.sust\.edu$/.test(email);
};

export const validate_registration_body = (body: any) => {
	return registerSchema.parse(body);
};

export const validate_login_body = (body: any) => {
	return loginSchema.parse(body);
};
