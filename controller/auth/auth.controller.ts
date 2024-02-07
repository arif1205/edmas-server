import { NextFunction, Request, Response } from "express";
import { validateRegistrationBody } from "../../lib/validation";
import { createUser } from "../../services/auth.services";
import { hashPassword } from "../../lib/hash";

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user_body = validateRegistrationBody(req.body);
		delete user_body?.confirmPassword;
		user_body.password = await hashPassword(user_body.password);
		const user = await createUser(user_body);

		res.status(201).json({
			message: "User registered successfully.",
			data: user,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

export default { register };
