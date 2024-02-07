import { NextFunction, Request, Response } from "express";
import path from "path";
import { CustomError } from "../../custom-class/CustomError";

const getFile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const filepath = req.query.filepath;
		if (!filepath) {
			throw new CustomError("Filepath is required", 403);
		}
		res.status(200).sendFile(path.join(__dirname, "../../" + filepath || ""));
	} catch (err: any) {
		next(err);
	}
};

export default { getFile };
