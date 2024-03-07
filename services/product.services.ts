import { z } from "zod";
import { CustomError } from "../custom-class/CustomError";
import prisma from "../db/db_client";
import { productSchema } from "../schema/product/product.schema";

type productBody = z.infer<typeof productSchema>;

export const createProduct = async (body: productBody) => {
	try {
		const product = prisma.items.create({
			data: {
				...body,
				image: body.image || "",
				quantity: Number(body.quantity),
				location: {
					connect: {
						id: body.location,
					},
				},
			},
			include: {
				location: true,
			},
		});
		return product;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const getAllProducts = async ({
	id,
	name,
	location,
}: {
	id?: string;
	name?: string;
	location?: string;
}) => {
	try {
		const products = await prisma.items.findMany({
			where: {
				...(id ? { id } : {}),
				...(name ? { name: { contains: name } } : {}),
				...(location ? { locationId: location } : {}),
			},
			include: {
				location: true,
			},
		});
		return products;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const updateProduct = async ({
	id,
	body,
}: {
	id: string;
	body: any;
}) => {
	try {
		const product = prisma.items.update({
			where: {
				id,
			},
			data: {
				...body,
			},
			include: {
				location: true,
			},
		});
		return product;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const deleteProduct = async (id: string) => {
	try {
		const product = prisma.items.delete({
			where: {
				id,
			},
		});
		return product;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};
