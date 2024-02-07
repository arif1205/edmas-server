import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import { CustomError } from "../../custom-class/CustomError";
import { hashPassword, verifyPassword } from "../../lib/hash";
import { generateToken } from "../../lib/token";
import {
	validate_login_body,
	validate_registration_body,
} from "../../lib/validation";
import { createUser } from "../../services/auth.services";
import { get_user_by_email } from "../../services/user.services";

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const req_body = JSON.parse(req.body?.data);
		const user_body = validate_registration_body(req_body);
		delete user_body?.confirmPassword;
		user_body.password = await hashPassword(user_body.password);
		const user = await createUser({ ...user_body, dp: req.file?.path });

		res.status(201).json({
			message: "User registered successfully.",
			data: user,
			status: 201,
		});
	} catch (err: any) {
		next(err);
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const credential_body = validate_login_body(req.body);
		const user = await get_user_by_email(credential_body.email);
		if (!user) {
			throw {
				status: 401,
				message: "Invalid credentials.",
			};
		}
		// compare password
		const is_valid = await verifyPassword(
			credential_body.password,
			user.password
		);

		if (!is_valid) {
			throw new CustomError("Invalid credentials.", 401);
		}

		// delete password
		const res_user = omit(user, "password");

		// generate token
		const token = await generateToken(res_user);

		res.status(200).json({
			message: "User logged in successfully.",
			data: res_user,
			token,
			status: 200,
		});
	} catch (err: any) {
		next(err);
	}
};

export default { register, login };
