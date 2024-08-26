import { Router } from "express";
import asesoresController from "../controllers/asesoresController.js";

const router = Router();

router.get("/asesores", asesoresController.getAllAsesores);
router.get("/asesores/:id", asesoresController.getAsesorById);
router.post("/asesores", asesoresController.createAsesor);
router.delete("/asesores/:id", asesoresController.deleteAsesorById);
router.put("/asesores/:id", asesoresController.updateAsesorById);

export default router;
