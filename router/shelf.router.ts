import { Router } from "express";
import shelfController from "../controller/shelf/shelf.controller";
import { is_manager } from "../middleware/is_manager.middlware";

const shelfRouter = Router();

shelfRouter.get("/get-all", shelfController.get_all_shelf_controller);
shelfRouter.get(
	"/get-by-id/:id",
	shelfController.get_all_shelf_by_id_controller
);
shelfRouter.post("/create", shelfController.create_shelf_controller);
shelfRouter.patch("/update/:id", shelfController.update_shelf_controller);
shelfRouter.delete("/delete/:id", shelfController.delete_shelf_controller);
shelfRouter.delete("/delete-all", shelfController.delete_all_shelf_controller);

export default shelfRouter;
