"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary_config = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinary_config = () => cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
exports.cloudinary_config = cloudinary_config;
