import { Role } from "../index.d";
import prisma from "../db/db_client";
import { CustomError } from "../custom-class/CustomError";

type RegistrationBody = {
	name: string;
	email: string;
	role: Role;
	password: string;
	about?: string;
	dp?: string;
};

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
