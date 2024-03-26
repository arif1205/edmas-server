import { z } from "zod";
import { CustomError } from "../custom-class/CustomError";
import prisma from "../db/db_client";
import { transactionSchema } from "../schema/accounts/accounts.schema";

type transactionBody = z.infer<typeof transactionSchema> & {
	[key: string]: any;
};

export const createTransaction = async (body: transactionBody) => {
	try {
		const account = await prisma.account.findMany();
		let new_account;
		if (account.length === 0) {
			// create account
			new_account = await prisma.account.create({
				data: {
					balance: 0,
				},
			});
		}

		const _transaction = prisma.transaction.create({
			data: {
				...body,
				amount: parseFloat(body.amount || "0"),
				...(body.documents
					? {
							documents: {
								createMany: {
									data: body.documents?.map((doc: string) => ({
										content: doc,
									})),
								},
							},
					  }
					: {}),
			},
			include: {
				documents: true,
			},
		});

		const _update_account = prisma.account.update({
			where: {
				id: new_account?.id || account[0]?.id,
			},
			data: {
				balance: {
					...(body.type === "income"
						? { increment: parseFloat(body.amount) }
						: { decrement: parseFloat(body.amount) }),
				},
			},
		});

		const [transaction, update_account] = await prisma.$transaction([
			_transaction,
			_update_account,
		]);

		return { ...transaction, current_balance: update_account.balance };
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const get_current_balance_service = async () => {
	try {
		const account = await prisma.account.findMany();
		return account.length > 0 ? account[0] : { message: "No account found" };
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const get_all_transaction_service = async () => {
	try {
		const tnx = await prisma.transaction.findMany({
			include: {
				documents: true,
			},
		});

		return tnx;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const update_transaction_service = async ({
	id,
	body,
}: {
	id: string;
	body: any;
}) => {
	try {
		const update_doc =
			body?.documents?.length > 0 &&
			(await prisma.document.deleteMany({
				where: {
					transactionId: id,
				},
			}));

		const tnx = await prisma.transaction.update({
			where: {
				id,
			},
			data: {
				...body,
				...(body.documents && update_doc
					? {
							documents: {
								update: {
									data: body.documents?.map((doc: string) => ({
										content: doc,
									})),
								},
							},
					  }
					: {}),
			},
			include: {
				documents: true,
			},
		});
		return tnx;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};

export const delete_transaction_service = async (id: string) => {
	try {
		const tnx = prisma.transaction.delete({
			where: {
				id,
			},
		});
		return tnx;
	} catch (err: any) {
		throw new CustomError(err?.message, 500);
	}
};
