export const getErrorResponse = (err: any, status: number) => {
	if (err.name === "ZodError") {
		// ** for validation error
		return {
			status: 403,
			message: `${err?.issues?.[0]?.path?.join("-")}: ${
				err?.issues?.[0]?.message
			}`,
		};
	} else if (err.name === "PrismaClientKnownRequestError") {
		// ** for custom error
		if (err.code === "P2002") {
			const target = err.meta?.target;
			let errorMessage = "Validation error: ";
			if (Array.isArray(target)) {
				errorMessage += target.join(", ");
			} else if (typeof target === "string") {
				errorMessage += target;
			}
			errorMessage += " already exists";
			return {
				status: 403,
				message: errorMessage,
			};
		}
		return {
			status: 403,
			message: err?.message,
		};
	} else if (err.name === "MulterError") {
		// ** for multer error
		return {
			status: 403,
			message: err.message,
		};
	} else if (err.name === "CustomError") {
		// ** for custom error
		return {
			status: err.status,
			message: err.message,
		};

		// ** for internal server error default
	} else {
		return {
			status,
			message: err?.message || "Internal Server Error",
		};
	}
};
