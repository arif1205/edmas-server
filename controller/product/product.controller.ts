import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import {
	validate_product_body,
	validate_product_body_partial,
	validate_shelf_body_partial,
} from "../../lib/validation";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
} from "../../services/product.services";
import _ from "lodash";

const create_product_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const req_body = req.body;
		const product_body = validate_product_body(req_body);

		// ** upload image if available
		let file_url: string = "";
		if (req.file) {
			await cloudinary.uploader.upload(
				req.file?.path,
				function (error: any, result: any) {
					if (error) {
						throw error;
					}
					file_url = result?.url;
				}
			);
		}

		const product = await createProduct({ ...product_body, image: file_url });

		res.status(201).json({
			message: "Product created successfully.",
			data: product,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

const get_all_product_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			name,
			location,
		}: {
			name?: string;
			location?: string;
		} = req.query;

		const products = await getAllProducts({ name, location });

		res.status(200).json({
			message: "All products fetched successfully.",
			data: products,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

const get_all_product_by_id_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const product = await getAllProducts({ id });

		if (product.length === 0) {
			throw new CustomError("Product not found.", 404);
		}

		res.status(200).json({
			message: "Product fetched successfully.",
			data: product[0],
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

const update_product_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const req_body = req.body;
		const id = req.params.id;
		const product_body = validate_product_body_partial(req_body);
		_.omitBy(product_body, _.isNil);

		// ** upload image if available
		let file_url: string = "";
		if (req.file) {
			await cloudinary.uploader.upload(
				req.file?.path,
				function (error: any, result: any) {
					if (error) {
						throw error;
					}
					file_url = result?.url;
				}
			);
		}

		const product = await updateProduct({
			id,
			body: {
				...product_body,
				...(product_body.quantity
					? { quantity: Number(product_body.quantity) }
					: {}),
				...(file_url ? { image: file_url } : {}),
				...(product_body.location
					? {
							location: {
								connect: {
									id: product_body.location,
								},
							},
					  }
					: {}),
			},
		});

		if (!product) {
			throw new CustomError("Product could not update", 404);
		}

		res.status(202).json({
			message: "Product updated successfully.",
			data: product,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

const delete_product_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id: string = req.params.id;
		if (!id) throw new CustomError("Product id is required", 400);

		const product = await deleteProduct(id);

		if (!product) {
			throw new CustomError("Product could not delete", 404);
		}

		res.status(202).json({
			message: "Shelf deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

export default {
	create_product_controller,
	get_all_product_controller,
	get_all_product_by_id_controller,
	update_product_controller,
	delete_product_controller,
};
