export const getErrorResponse = (err: any, status: number) => {
	// ** for validation error
	if (err.name === "ZodError") {
		return {
			status: 403,
			message: `${err?.issues?.[0]?.path?.join("-")}: ${
				err?.issues?.[0]?.message
			}`,
		};
		// ** for custom error
	} else if (err.name === "PrismaClientKnownRequestError") {
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

		// ** for internal server error default
	} else {
		return {
			status,
			message: "Internal Server Error",
		};
	}
};
