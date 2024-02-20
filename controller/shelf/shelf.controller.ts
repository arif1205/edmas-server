import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../custom-class/CustomError";
import {
	validate_shelf_body,
	validate_shelf_body_partial,
} from "../../lib/validation";
import {
	createShelf,
	deleteShelf,
	getAllShelf,
	updateShelf,
} from "../../services/shelf.services";

const create_shelf_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const req_body = req.body;
		const shelf_body = validate_shelf_body(req_body);
		const shelf = await createShelf(shelf_body);

		res.status(201).json({
			message: "Shelf created successfully.",
			data: shelf,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

const get_all_shelf_controller = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const shelfs = await getAllShelf({});

		res.status(200).json({
			message: "All shelfs fetched successfully.",
			data: shelfs,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

const get_all_shelf_by_id_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id;
		const shelfs = await getAllShelf({ id });

		if (shelfs.length === 0) {
			throw new CustomError("Shelf not found.", 404);
		}

		res.status(200).json({
			message: "Shelf fetched successfully.",
			data: shelfs[0],
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

const update_shelf_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const req_body = req.body;
		const id = req.params.id;
		const shelf_body = validate_shelf_body_partial(req_body);
		const shelf = await updateShelf({ id, body: shelf_body });

		if (!shelf) {
			throw new CustomError("Shelf could not update", 404);
		}

		res.status(204).json({
			message: "Shelf updated successfully.",
			data: shelf,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

const delete_shelf_controller = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id: string = req.params.id;
		if (!id) throw new CustomError("Shelf id is required", 400);

		const shelf = await deleteShelf(id);

		if (!shelf) {
			throw new CustomError("Shelf could not delete", 404);
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
	create_shelf_controller,
	get_all_shelf_controller,
	get_all_shelf_by_id_controller,
	update_shelf_controller,
	delete_shelf_controller,
};
