import { Router } from "express";
import supervisoresController from "../controllers/supervisoresController.js";

const router = Router();

router
  .get("/supervisores", supervisoresController.getAllSupervisores)
  .get("/supervisores/:id", supervisoresController.getSupervisorById)
  .post("/supervisores", supervisoresController.createSupervisor)
  .delete("/supervisores/:id", supervisoresController.deleteSupervisorById)
  .put("/supervisores/:id", supervisoresController.updateSupervisorById);

export default router;