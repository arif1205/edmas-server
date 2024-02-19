import { loginSchema, registerSchema } from "../schema/auth/auth.schema";
import { shelfSchema } from "../schema/shelf/shelf.schema";

export const validate_sust_mail = (email: string): boolean => {
	return /.*\.sust\.edu$/.test(email);
};

export const validate_registration_body = (body: any) => {
	return registerSchema.parse(body);
};

export const validate_login_body = (body: any) => {
	return loginSchema.parse(body);
};

export const validate_shelf_body = (body: any) => {
	return shelfSchema.parse(body);
};

export const validate_shelf_body_partial = (body: any) => {
	return shelfSchema.partial().parse(body);
};
