import { check } from "express-validator";

const validateSeguimiento = [
  check("texto")
    .notEmpty()
    .withMessage("Texto es requerido.")
    .isString()
    .withMessage("Texto debe ser un texto.")
    .isLength({ min: 5 })
    .withMessage("Texto debe tener al menos 5 caracteres."),

  check("fecha")
    .notEmpty()
    .withMessage("Fecha es requerida.")
    .isISO8601()
    .withMessage("Fecha debe estar en formato ISO 8601 (YYYY-MM-DD)."),

  check("idVenta")
    .isNumeric()
    .withMessage("ID de la Venta debe ser un número.")
    .notEmpty()
    .withMessage("ID de la Venta es requerido."),
];

export default {
  validateSeguimiento,
};
