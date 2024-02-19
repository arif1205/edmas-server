import { NextFunction, Request, Response } from "express";
import { CustomError } from "../custom-class/CustomError";
import { decodeToken, verifyToken } from "../lib/token";

export const check_auth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			throw new CustomError("Unauthorized", 401);
		}

		const verified = await verifyToken(token);
		if (!verified) {
			throw new CustomError("Unauthorized", 401);
		}

		const decoded: any = await decodeToken(token);

		if (!decoded) {
			throw new CustomError("Unauthorized", 401);
		}

		req.headers.user = decoded;
		next();
	} catch (err: any) {
		next(err);
	}
};
