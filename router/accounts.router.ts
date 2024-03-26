import { Router } from "express";
import accountsController from "../controller/accounts/accounts.controller";
import upload from "../config/multer.config";

const accountsRouter = Router();

accountsRouter.get(
	"/get-current-balance",
	accountsController.get_current_balance
);

accountsRouter.get(
	"/get-all-transaction",
	accountsController.get_all_transaction_controller
);

accountsRouter.post(
	"/create",
	upload.array("documents", 5),
	accountsController.create_transaction_controller
);

// accountsRouter.patch(
// 	"/update/:id",
// 	upload.array("documents", 5),
// 	accountsController.update_transaction_controller
// );

// accountsRouter.delete(
// 	"/delete/:id",
// 	accountsController.delete_transaction_controller
// );

export default accountsRouter;
