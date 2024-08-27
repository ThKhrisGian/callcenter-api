import { Router } from "express";
import asesoresController from "../controllers/asesoresController.js";
import asesoresValidator from "../validators/asesoresValidator.js";

const router = Router();

router
  .get("/asesores", asesoresController.getAllAsesores)
  .get("/asesores/:id", asesoresController.getAsesorById)
  .post(
    "/asesores",
    asesoresValidator.validateAsesor,
    asesoresController.createAsesor
  )
  .delete("/asesores/:id", asesoresController.deleteAsesorById)
  .put(
    "/asesores/:id",
    asesoresValidator.validateAsesor,
    asesoresController.updateAsesorById
  );

export default router;
