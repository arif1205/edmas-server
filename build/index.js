"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const root_router_1 = __importDefault(require("./router/root.router"));
const error_services_1 = require("./services/error.services");
const cloudinary_config_1 = require("./config/cloudinary.config");
//For env File
dotenv_1.default.config();
(0, cloudinary_config_1.cloudinary_config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "/uploads")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", root_router_1.default);
// ** global error handler
app.use((err, _req, res, next) => {
    // console.log(err);
    // ** if headers already sent
    if (res.headersSent) {
        return next(err);
    }
    const status = (err === null || err === void 0 ? void 0 : err.status) || 500;
    const errorResponse = (0, error_services_1.getErrorResponse)(err, status);
    res
        .status(errorResponse.status)
        .json({ error: errorResponse.message, status: errorResponse.status });
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
