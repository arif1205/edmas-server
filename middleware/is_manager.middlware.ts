import { NextFunction, Request, Response } from "express";
import { CustomError } from "../custom-class/CustomError";

export const is_manager = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const role = JSON.parse(JSON.stringify(req.headers.user)).role;
		if (!role || (role !== "store_manager" && role !== "dept_head")) {
			throw new CustomError("Unauthorized", 401);
		}

		next();
	} catch (err: any) {
		next(err);
	}
};
