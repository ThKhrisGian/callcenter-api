import { Router } from "express";
import ventasController from "../controllers/ventasController.js";
import { db } from "../db.js";

const router = Router();

router
  .get("/ventas", ventasController.getAllVentas)
  .get("/ventas/:id", ventasController.getVentaById)
  .post("/ventas", ventasController.createVenta)
  .delete("/ventas/:id", ventasController.deleteVentaById)
  .put("/ventas/:id", ventasController.updateVentaById);

export default router;
