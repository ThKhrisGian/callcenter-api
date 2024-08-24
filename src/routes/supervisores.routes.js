import { Router } from "express";
import supervisoresController from "../controllers/supervisoresController.js";

const router = Router();

router.get("/supervisores", supervisoresController.getAllSupervisores);
router.get("/supervisores/:id", supervisoresController.getSupervisorById);
router.post("/supervisores", supervisoresController.createSupervisor);
router.delete("/supervisores/:id", supervisoresController.deleteSupervisorById);
router.put("/supervisores/:id", supervisoresController.updateSupervisorById);

export default router;