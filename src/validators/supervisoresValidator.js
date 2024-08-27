import { check } from "express-validator";

const validateCreateSupervisor = [
  check("nombre").notEmpty().withMessage("Nombre es requerido."),
  check("contrasena").notEmpty().withMessage("Contraseña es requerida."),
];

const validateUpdateSupervisor = [
  check("nombre")
    .optional()
    .notEmpty()
    .withMessage("Nombre no puede estar vacío."),
  check("contrasena")
    .optional()
    .notEmpty()
    .withMessage("Contraseña no puede estar vacía."),
];

export default {
  validateCreateSupervisor,
  validateUpdateSupervisor,
};
