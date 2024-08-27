import { check } from "express-validator";

const validateCliente = [
  check("nombre")
    .notEmpty()
    .withMessage("Nombre es requerido.")
    .isLength({ min: 2 })
    .withMessage("Nombre debe tener al menos 2 caracteres."),

  check("dni")
    .notEmpty()
    .withMessage("DNI es requerido.")
    .matches(/^\d{8}[A-Z]$/)
    .withMessage("DNI debe tener 8 dígitos seguidos de una letra mayúscula."),

  check("fecha_nacimiento")
    .notEmpty()
    .withMessage("Fecha de nacimiento es requerida.")
    .isISO8601()
    .withMessage(
      "Fecha de nacimiento debe estar en formato ISO 8601 (YYYY-MM-DD)."
    ),

  check("email")
    .notEmpty()
    .withMessage("Email es requerido.")
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido."),

  check("direccion").notEmpty().withMessage("Dirección es requerida."),

  check("provincia").notEmpty().withMessage("Provincia es requerida."),

  check("distrito").notEmpty().withMessage("Distrito es requerido."),

  check("cp")
    .notEmpty()
    .withMessage("Código postal es requerido.")
    .isPostalCode("ES")
    .withMessage("Código postal debe ser un código válido en España."),

  check("num_fijo")
    .optional()
    .matches(/^(\+34|0034|34)?[8|9][0-9]{8}$/)
    .withMessage("Número fijo debe ser un teléfono válido en España."),

  check("num_moviles")
    .notEmpty()
    .withMessage("Número móvil es requerido.")
    .isMobilePhone("es-ES", { strictMode: false })
    .withMessage("Número móvil debe ser un teléfono válido en España."),

  check("cuentaBancaria")
    .notEmpty()
    .withMessage("Cuenta bancaria es requerida.")
    .matches(/^[A-Z]{2}\d{22}$/)
    .withMessage(
      "Cuenta bancaria debe estar en formato IBAN y tener 24 caracteres."
    ),
];

export default {
  validateCliente,
};
