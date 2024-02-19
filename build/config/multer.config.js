"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const CustomError_1 = require("../custom-class/CustomError");
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads");
    },
    filename: (_req, file, cb) => {
        const fileExt = path_1.default.extname(file.originalname);
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
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2MB
    },
    fileFilter: (_req, file, cb) => {
        if (file.fieldname === "dp") {
            if (file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg")
                cb(null, true);
            else
                cb(new CustomError_1.CustomError("Only images are allowed.", 403, "MulterError"));
        }
        else
            cb(null, true);
    },
});
exports.default = upload;
