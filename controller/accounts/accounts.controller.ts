import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { CustomError } from "../../custom-class/CustomError";
import {
	validate_transaction_body,
	validate_transaction_body_partial,
} from "../../lib/validation";
import {
	createTransaction,
	delete_transaction_service,
	get_all_transaction_service,
	get_current_balance_service,
	update_transaction_service,
} from "../../services/accounts.services";

const create_transaction_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const req_body = req.body;
		const transaction_body = validate_transaction_body(req_body);
		const files: Express.Multer.File[] = req.files as [];

		let file_urls: string[] = [];
		if (files) {
			for (let i = 0; i < files?.length; i++) {
				await cloudinary.uploader.upload(
					files[i]?.path,
					function (error: any, result: any) {
						if (error) {
							throw error;
						}
						file_urls.push(result?.url);
					}
				);
			}
		}

		const transaction: any = await createTransaction({
			...transaction_body,
			documents: file_urls,
		});

		res.status(201).json({
			message: "Transanction created successfully.",
			data: transaction,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

const get_current_balance = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const curr_balance = await get_current_balance_service();

		res.status(200).json({
			message: "Current balance fetched successfully.",
			data: curr_balance,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

const get_all_transaction_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const tnx = await get_all_transaction_service();

		if (tnx.length === 0) {
			throw new CustomError("Transactions not found.", 404);
		}

		res.status(200).json({
			message: "Transactions fetched successfully.",
			data: tnx,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

const update_transaction_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const req_body = req.body;
		const id = req.params.id;
		const transaction_body = validate_transaction_body_partial(req_body);
		_.omitBy(transaction_body, _.isNil);

		const files: Express.Multer.File[] = req.files as [];

		let file_urls: string[] = [];
		if (files) {
			for (let i = 0; i < files?.length; i++) {
				await cloudinary.uploader.upload(
					files[i]?.path,
					function (error: any, result: any) {
						if (error) {
							throw error;
						}
						file_urls.push(result?.url);
					}
				);
			}
		}

		const tnx = await update_transaction_service({
			id,
			body: { ...transaction_body, documents: file_urls },
		});

		if (!tnx) {
			throw new CustomError("Transaction could not update", 404);
		}

		res.status(202).json({
			message: "Transaction updated successfully.",
			data: tnx,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

const delete_transaction_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id: string = req.params.id;
		if (!id) throw new CustomError("Transaction id is required", 400);

		const tnx = await delete_transaction_service(id);

		if (!tnx) {
			throw new CustomError("Transaction could not delete", 404);
		}

		res.status(202).json({
			message: "Transaction deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

export default {
	create_transaction_controller,
	get_current_balance,
	get_all_transaction_controller,
	update_transaction_controller,
	delete_transaction_controller,
};
