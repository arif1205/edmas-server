import multer from "multer";
import path from "path";
import { CustomError } from "../custom-class/CustomError";

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, "uploads");
	},
	filename: (_req, file, cb) => {
		const fileExt = path.extname(file.originalname);
		const fieldName = file.fieldname;
		const originalName = file.originalname
			.replace(fileExt, "")
			.toLowerCase()
			.split(" ")
			.join("-");

		const fileName = `${fieldName}-${originalName}-${Date.now()}${fileExt}`;
		cb(null, fileName);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 2, // 2MB
	},
	fileFilter: (_req, file, cb) => {
		if (file.fieldname === "dp") {
			if (
				file.mimetype === "image/png" ||
				file.mimetype === "image/jpg" ||
				file.mimetype === "image/jpeg"
			)
				cb(null, true);
			else cb(new CustomError("Only images are allowed.", 403, "MulterError"));
		} else cb(null, true);
	},
});

export default upload;
