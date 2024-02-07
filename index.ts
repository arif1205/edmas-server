import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import rootRouter from "./router/root.router";
import { getErrorResponse } from "./services/error.services";
import { CustomError } from "./index.d";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", rootRouter);

// ** global error handler
app.use(
	(err: CustomError, _req: Request, res: Response, next: NextFunction) => {
		// ** if headers already sent
		if (res.headersSent) {
			return next(err);
		}

		const status = err?.status || 500;
		const errorResponse = getErrorResponse(err, status);
		res
			.status(errorResponse.status)
			.json({ error: errorResponse.message, status: errorResponse.status });
	}
);

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});
