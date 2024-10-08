import { check } from "express-validator";

const validateSupervisor = [
  check("nombre").notEmpty().withMessage("Nombre es requerido."),
  check("contrasena").notEmpty().withMessage("Contraseña es requerida."),
];

export default {
  validateSupervisor,
};
