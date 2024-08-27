import { check } from "express-validator";

const validateVenta = [
  check("oferta")
    .notEmpty()
    .withMessage("Oferta es requerida.")
    .isString()
    .withMessage("Oferta debe ser un texto."),

  check("estado")
    .notEmpty()
    .withMessage("Estado es requerido.")
    .isString()
    .withMessage("Estado debe ser un texto.")
    .isIn(["pendiente de instalación", "instalado", "cancelado"])
    .withMessage(
      "Estado debe ser uno de los siguientes: pendiente de instalación, instalado, cancelado."
    ),

  check("idAsesor")
    .isNumeric()
    .withMessage("ID del Asesor debe ser un número.")
    .notEmpty()
    .withMessage("ID del Asesor es requerido."),

  check("idCliente")
    .isNumeric()
    .withMessage("ID del Cliente debe ser un número.")
    .notEmpty()
    .withMessage("ID del Cliente es requerido."),
];

export default {
  validateVenta,
};
