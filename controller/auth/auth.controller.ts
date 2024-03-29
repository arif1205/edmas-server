import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import { CustomError } from "../../custom-class/CustomError";
import { hashPassword, verifyPassword } from "../../lib/hash";
import { generateToken } from "../../lib/token";
import { validate_registration_body } from "../../lib/validation";
import { createUser } from "../../services/auth.services";
import { get_user_by_email } from "../../services/user.services";
import { v2 as cloudinary } from "cloudinary";

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const req_body = req.body;
		const user_body = validate_registration_body(req_body);

		// ** upload dp in cloudinary
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

		delete user_body?.confirmPassword;
		user_body.password = await hashPassword(user_body.password);
		const user = await createUser({ ...user_body, dp: file_url });

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
		const credential_body = req.body;
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
