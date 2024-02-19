import { z } from "zod";
import { CustomError } from "../custom-class/CustomError";
import prisma from "../db/db_client";
import { registerSchema } from "../schema/auth/auth.schema";

type RegistrationBody = z.infer<typeof registerSchema>;

export const createUser = async (body: RegistrationBody) => {
	try {
		// Create user in database
		const user = prisma.user.create({
			data: body,
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				about: true,
				dp: true,
				password: false,
			},
		});
		return user;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};
