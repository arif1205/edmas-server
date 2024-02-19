import { z } from "zod";
import { CustomError } from "../custom-class/CustomError";
import prisma from "../db/db_client";
import { shelfSchema, shelfSchemaPartial } from "../schema/shelf/shelf.schema";

type ShelfBody = z.infer<typeof shelfSchema>;
type ShelfPartialBody = z.infer<typeof shelfSchemaPartial>;

export const createShelf = async (body: ShelfBody) => {
	try {
		// Create user in database
		const user = prisma.shelf.create({
			data: body,
		});
		return user;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const getAllShelf = async ({ id }: { id?: string }) => {
	try {
		const shelfs = await prisma.shelf.findMany({
			where: {
				...(id ? { id } : {}),
			},
		});
		return shelfs;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const updateShelf = async ({
	id,
	body,
}: {
	id: string;
	body: ShelfPartialBody;
}) => {
	try {
		// Create user in database
		const user = prisma.shelf.update({
			where: {
				id,
			},
			data: body,
		});
		return user;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const deleteShelf = async (id: string) => {
	try {
		const user = prisma.shelf.delete({
			where: {
				id,
			},
		});
		return user;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};
