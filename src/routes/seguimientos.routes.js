import { Router } from "express";

import seguimientosController from "../controllers/seguimientosController.js";
import seguimientosValidator from "../validators/seguimientosValidator.js";

const router = Router();

// Obtener todos los seguimientos
router
  .get("/seguimientos", seguimientosController.getAllSeguimientos)
  .get("/seguimientos/:id", seguimientosController.getSeguimientoById)
  .post(
    "/seguimientos",
    seguimientosValidator.validateSeguimiento,
    seguimientosController.createSeguimiento
  )
  .delete("/seguimientos/:id", seguimientosController.deleteSeguimientoById)
  .put(
    "/seguimientos/:id",
    seguimientosValidator.validateSeguimiento,
    seguimientosController.updateSeguimientoById
  );

export default router;
