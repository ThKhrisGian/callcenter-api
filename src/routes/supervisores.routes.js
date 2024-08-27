import { Router } from "express";
import supervisoresController from "../controllers/supervisoresController.js";
import supervisoresValidator from "../validators/supervisoresValidator.js";

const router = Router();

router
  .get("/supervisores", supervisoresController.getAllSupervisores)
  .get("/supervisores/:id", supervisoresController.getSupervisorById)
  .post(
    "/supervisores",
    supervisoresValidator.validateSupervisor,
    supervisoresController.createSupervisor
  )
  .delete("/supervisores/:id", supervisoresController.deleteSupervisorById)
  .put(
    "/supervisores/:id",
    supervisoresValidator.validateSupervisor,
    supervisoresController.updateSupervisorById
  );

export default router;
