import prisma from "../db/db_client";

export const get_user_by_email = async (email: string) => {
	try {
		return await prisma.user.findUnique({
			where: {
				email,
			},
		});
	} catch (err) {
		throw err;
	}
};
