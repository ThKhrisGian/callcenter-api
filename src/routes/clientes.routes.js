import { Router } from "express";
import clientesController from "../controllers/clientesController.js";
import clientesValidator from "../validators/clientesValidator.js";

const router = Router();

router
  .get("/clientes", clientesController.getAllClientes)
  .get("/clientes/:id", clientesController.getClienteById)
  .post(
    "/clientes",
    clientesValidator.validateCliente,
    clientesController.createCliente
  )
  .delete("/clientes/:id", clientesController.deleteClienteById)
  .put(
    "/clientes/:id",
    clientesValidator.validateCliente,
    clientesController.updateClienteById
  );

export default router;
