import { Router } from "express";
import { db } from "../db.js";

import seguimientosController from "../controllers/seguimientosController.js";

const router = Router();

// Obtener todos los seguimientos
router.get("/seguimientos", seguimientosController.getAllSeguimientos);
router.get("/seguimientos/:id", seguimientosController.getSeguimientoById); //

// Crear un nuevo seguimiento
router.post("/seguimientos", seguimientosController.createSeguimiento);

// Eliminar un seguimiento por id
router.delete(
  "/seguimientos/:id",
  seguimientosController.deleteSeguimientoById
);

// Actualizar un seguimiento por id
router.put("/seguimientos/:id", seguimientosController.updateSeguimientoById);

export default router;
