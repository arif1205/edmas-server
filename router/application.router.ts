import { Router } from "express";
import applicationController from "../controller/application/application.controller";
import { is_manager } from "../middleware/is_manager.middlware";

const applicationRouter = Router();

applicationRouter.get(
	"/get-all",
	applicationController.get_all_application_controller
);
applicationRouter.get(
	"/get-by-id/:id",
	applicationController.get_application_by_id_controller
);
applicationRouter.post(
	"/create",
	applicationController.create_application_controller
);
applicationRouter.patch(
	"/update/:id",
	is_manager,
	applicationController.update_application_controller
);
applicationRouter.delete(
	"/delete/:id",
	is_manager,
	applicationController.delete_application_controller
);

export default applicationRouter;
