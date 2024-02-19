"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorResponse = void 0;
const getErrorResponse = (err, status) => {
    var _a, _b, _c, _d, _e, _f;
    if (err.name === "ZodError") {
        // ** for validation error
        return {
            status: 403,
            message: `${(_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.path) === null || _c === void 0 ? void 0 : _c.join("-")}: ${(_e = (_d = err === null || err === void 0 ? void 0 : err.issues) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message}`,
        };
    }
    else if (err.name === "PrismaClientKnownRequestError") {
        // ** for custom error
        if (err.code === "P2002") {
            const target = (_f = err.meta) === null || _f === void 0 ? void 0 : _f.target;
            let errorMessage = "Validation error: ";
            if (Array.isArray(target)) {
                errorMessage += target.join(", ");
            }
            else if (typeof target === "string") {
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
            message: err === null || err === void 0 ? void 0 : err.message,
        };
    }
    else if (err.name === "MulterError") {
        // ** for multer error
        return {
            status: 403,
            message: err.message,
        };
    }
    else if (err.name === "CustomError") {
        // ** for custom error
        return {
            status: err.status,
            message: err.message,
        };
        // ** for internal server error default
    }
    else {
        return {
            status,
            message: (err === null || err === void 0 ? void 0 : err.message) || "Internal Server Error",
        };
    }
};
exports.getErrorResponse = getErrorResponse;
