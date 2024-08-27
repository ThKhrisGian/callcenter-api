import { Router } from "express";
import { db } from "../db.js";

import seguimientosController from "../controllers/seguimientosController.js";

const router = Router();

// Obtener todos los seguimientos
router
  .get("/seguimientos", seguimientosController.getAllSeguimientos)
  .get("/seguimientos/:id", seguimientosController.getSeguimientoById)
  .post("/seguimientos", seguimientosController.createSeguimiento)
  .delete("/seguimientos/:id", seguimientosController.deleteSeguimientoById)
  .put("/seguimientos/:id", seguimientosController.updateSeguimientoById);

export default router;
