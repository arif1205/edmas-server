import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { CustomError } from "../../custom-class/CustomError";
import {
	validate_application_body,
	validate_application_body_partial,
} from "../../lib/validation";
import {
	createApplication,
	deleteApplication,
	getAllApplication,
	updateApplication,
} from "../../services/application.services";
import { updateProduct } from "../../services/product.services";

const create_application_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const req_body = req.body;
		const application_body = validate_application_body(req_body);

		const application: any = await createApplication(application_body);

		res.status(201).json({
			message: "Application created successfully.",
			data: {
				...application,
				quantity: JSON.parse(application?.quantity || null),
			},
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

const get_all_application_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			id,
			itemId,
			applicant,
			applicationTo,
		}: {
			id?: string;
			itemId?: string;
			applicant?: string;
			applicationTo?: string;
		} = req.query;

		const applications = await getAllApplication({
			id,
			itemId,
			applicant,
			applicationTo,
		});

		res.status(200).json({
			message: "All applications fetched successfully.",
			count: applications.length,
			data: applications,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

const get_application_by_id_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const application = await getAllApplication({ id });

		if (application.length === 0) {
			throw new CustomError("Application not found.", 404);
		}

		res.status(200).json({
			message: "Product fetched successfully.",
			data: application[0],
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

const update_application_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const req_body = req.body;
		const id = req.params.id;
		const application_body = validate_application_body_partial(req_body);
		_.omitBy(application_body, _.isNil);

		const application = await updateApplication({
			id,
			body: application_body,
		});

		if (!application) {
			throw new CustomError("Application could not update", 404);
		}

		res.status(202).json({
			message: "Application updated successfully.",
			data: application,
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

const delete_application_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id: string = req.params.id;
		if (!id) throw new CustomError("Application id is required", 400);

		const application = await deleteApplication(id);

		if (!application) {
			throw new CustomError("Application could not delete", 404);
		}

		res.status(202).json({
			message: "Application deleted successfully.",
			status: 202,
		});
	} catch (err: any) {
		next(err);
	}
};

export default {
	create_application_controller,
	get_all_application_controller,
	get_application_by_id_controller,
	update_application_controller,
	delete_application_controller,
};
