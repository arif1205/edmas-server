import { z } from "zod";
import { CustomError } from "../custom-class/CustomError";
import prisma from "../db/db_client";
import {
	applicationSchema,
	applicationSchemaPartial,
} from "../schema/application/application.schema";

type applicationBody = z.infer<typeof applicationSchema>;

export const createApplication = async (body: applicationBody) => {
	try {
		const application = await prisma.application.create({
			data: {
				...body,
				quantity: JSON.stringify(body.items),
				items: {
					connect: body.items.map((item) => ({ id: item.id })),
				},
				itemsId: body.items.map((item) => item.id),
			},
			include: {
				items: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				applicant: {
					select: {
						id: true,
						name: true,
						email: true,
						dp: true,
					},
				},
				applicationTo: {
					select: {
						id: true,
						name: true,
						email: true,
						dp: true,
					},
				},
			},
		});

		return application;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const getAllApplication = async ({
	id,
	itemId,
	applicant,
	applicationTo,
}: {
	id?: string;
	itemId?: string;
	applicant?: string;
	applicationTo?: string;
}) => {
	try {
		const applications = await prisma.application.findMany({
			where: {
				...(id ? { id } : {}),
				...(itemId ? { itemsId: { has: itemId } } : {}),
				...(applicant ? { applicantId: applicant } : {}),
				...(applicationTo ? { applicationToId: applicationTo } : {}),
			},
			include: {
				items: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				applicant: {
					select: {
						id: true,
						name: true,
						email: true,
						dp: true,
					},
				},
				applicationTo: {
					select: {
						id: true,
						name: true,
						email: true,
						dp: true,
					},
				},
			},
		});
		return applications;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const updateApplication = async ({
	id,
	body,
}: {
	id: string;
	body: any;
}) => {
	try {
		const application = prisma.application.update({
			where: {
				id,
			},
			data: {
				...body,
			},
			include: {
				items: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
				applicant: {
					select: {
						id: true,
						name: true,
						email: true,
						dp: true,
					},
				},
				applicationTo: {
					select: {
						id: true,
						name: true,
						email: true,
						dp: true,
					},
				},
			},
		});
		return application;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const deleteApplication = async (id: string) => {
	try {
		const application = prisma.application.delete({
			where: {
				id,
			},
		});
		return application;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};
