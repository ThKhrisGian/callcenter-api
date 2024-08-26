import { Router } from "express";
import { db } from "../db.js";
import clientesController from "../controllers/clientesController.js";

const router = Router();

router
  .get("/clientes", clientesController.getAllClientes)
  .get("/clientes/:id", clientesController.getClienteById)
  .post("/clientes", clientesController.createCliente)
  .delete("/clientes/:id", clientesController.deleteClienteById)
  .put("/clientes/:id", clientesController.updateClienteById);

export default router;
