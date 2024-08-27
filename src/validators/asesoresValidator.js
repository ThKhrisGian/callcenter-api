import { check } from "express-validator";

const validateAsesor = [
  check("nombre").notEmpty().withMessage("Nombre es requerido."),
  check("contrasena").notEmpty().withMessage("Contraseña es requerida."),
  check("idSupervisor")
    .isNumeric()
    .withMessage("idSupervisor debe ser numérico")
    .notEmpty()
    .withMessage("idSupervisor es requerido."),
];

export default {
  validateAsesor,
};
