import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import SessionController from "./controllers/SessionController";
import PropertiersController from "./controllers/PropertiersController";
import DashboardController from "./controllers/DashboardController";
import ReserveController from "./controllers/ReserveController";

const routes = new Router();

// Essa variavel upload é uma instancia do multer passando a configuração de upload
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);

// upload.single('thumbnail') = upload de um unico arquivo com o campo thumbnail
routes.post(
    "/properties",
    upload.single("thumbnail"),
    PropertiersController.store,
);

routes.get("/properties", PropertiersController.index);
routes.put(
    "/properties/:property_id",
    upload.single("thumbnail"),
    PropertiersController.update,
);
routes.delete("/properties", PropertiersController.destroy);

routes.get("/dashboard", DashboardController.show);

routes.post("/properties/:property_id/reserve", ReserveController.store);
routes.get("/reserves", ReserveController.index);
routes.delete("/reserves/cancel", ReserveController.destroy);

export default routes;
