import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import path from "path";
import cors from "cors";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api/v1", rootRouter);

// ** global error handler
app.use((err: Error, _req: Request, res: Response) => {
	res.status(500).json({ error: err.message });
});

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});
