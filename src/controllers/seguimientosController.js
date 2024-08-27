import { validationResult } from "express-validator";
import seguimientosServices from "../services/seguimientosServices.js";

const getAllSeguimientos = async (req, res) => {
  try {
    const allSeguimientos = await seguimientosServices.getAllSeguimientos();
    res.json(allSeguimientos);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const getSeguimientoById = async (req, res) => {
  const { id } = req.params;

  try {
    const seguimiento = await seguimientosServices.getSeguimientoById(id);
    res.json(seguimiento);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const createSeguimiento = async (req, res) => {
  const { texto, fecha, idVenta } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: errors?.array().map((error) => error.msg) });
  }

  try {
    const createdSeguimiento = await seguimientosServices.createSeguimiento(
      texto,
      fecha,
      idVenta
    );

    res.json(createdSeguimiento);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const updateSeguimientoById = async (req, res) => {
  const { id } = req.params;
  const { texto, fecha, idVenta } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  try {
    const updatedSeguimiento = await seguimientosServices.updateSeguimientoById(
      id,
      texto,
      fecha,
      idVenta
    );

    res.json(updatedSeguimiento);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const deleteSeguimientoById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSeguimiento = await seguimientosServices.deleteSeguimientoById(
      id
    );
    res.json(deletedSeguimiento);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

export default {
  getAllSeguimientos,
  getSeguimientoById,
  createSeguimiento,
  updateSeguimientoById,
  deleteSeguimientoById,
};
