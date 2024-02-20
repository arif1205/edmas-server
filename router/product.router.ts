import { Router } from "express";
import productController from "../controller/product/product.controller";
import { is_manager } from "../middleware/is_manager.middlware";
import upload from "../config/multer.config";

const productRouter = Router();

productRouter.get("/get-all", productController.get_all_product_controller);
productRouter.get(
	"/get-by-id/:id",
	productController.get_all_product_by_id_controller
);
productRouter.post(
	"/create",
	is_manager,
	upload.single("image"),
	productController.create_product_controller
);
productRouter.patch(
	"/update/:id",
	is_manager,
	upload.single("image"),
	productController.update_product_controller
);
productRouter.delete(
	"/delete/:id",
	is_manager,
	productController.delete_product_controller
);

export default productRouter;
