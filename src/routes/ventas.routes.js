import { Router } from "express";
import ventasController from "../controllers/ventasController.js";
import ventasValidators from "../validators/ventasValidators.js";

const router = Router();

router
  .get("/ventas", ventasController.getAllVentas)
  .get("/ventas/:id", ventasController.getVentaById)
  .post("/ventas", ventasValidators.validateVenta, ventasController.createVenta)
  .delete("/ventas/:id", ventasController.deleteVentaById)
  .put(
    "/ventas/:id",
    ventasValidators.validateVenta,
    ventasController.updateVentaById
  );

export default router;
