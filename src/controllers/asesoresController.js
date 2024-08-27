import { validationResult } from "express-validator";
import asesoresServices from "../services/asesoresServices.js";

const getAllAsesores = async (req, res) => {
  try {
    const allAsesores = await asesoresServices.getAllAsesores();
    res.json(allAsesores);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const getAsesorById = async (req, res) => {
  const { id } = req.params;

  try {
    const asesor = await asesoresServices.getAsesorById(id);

    res.json(asesor);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const createAsesor = async (req, res) => {
  const { nombre, contrasena, idSupervisor } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: errors?.array().map((error) => error.msg) });
  }

  try {
    const createdAsesor = await asesoresServices.createAsesor(
      nombre,
      contrasena,
      idSupervisor
    );

    res.json(createdAsesor);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const updateAsesorById = async (req, res) => {
  const { id } = req.params;
  const { nombre, contrasena, idSupervisor } = req.body;

  try {
    const updatedAsesor = await asesoresServices.updateAsesorById(
      id,
      nombre,
      contrasena,
      idSupervisor
    );

    res.json(updatedAsesor);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const deleteAsesorById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAsesor = await asesoresServices.deleteAsesorById(id);

    res.json(deletedAsesor);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

export default {
  getAllAsesores,
  getAsesorById,
  createAsesor,
  updateAsesorById,
  deleteAsesorById,
};
