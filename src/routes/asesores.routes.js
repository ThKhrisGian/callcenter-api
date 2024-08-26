import { Router } from "express";
import asesoresController from "../controllers/asesoresController.js";

const router = Router();

router
  .get("/asesores", asesoresController.getAllAsesores)
  .get("/asesores/:id", asesoresController.getAsesorById)
  .post("/asesores", asesoresController.createAsesor)
  .delete("/asesores/:id", asesoresController.deleteAsesorById)
  .put("/asesores/:id", asesoresController.updateAsesorById);

export default router;
