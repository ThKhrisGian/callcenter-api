import { validationResult } from "express-validator";
import supervisoresServices from "../services/supervisoresServices.js";

const getAllSupervisores = async (req, res) => {
  try {
    const allSupervisores = await supervisoresServices.getAllSupervisores();
    res.json(allSupervisores);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const getSupervisorById = async (req, res) => {
  const { id } = req.params;

  try {
    const supervisor = await supervisoresServices.getSupervisorById(id);
    res.json(supervisor);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const createSupervisor = async (req, res) => {
  const { nombre, contrasena } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({error: errors?.array().map((error) => error.msg)});
  }

  try {
    const createdSupervisor = await supervisoresServices.createSupervisor(
      nombre,
      contrasena
    );
    res.json(createdSupervisor);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const updateSupervisorById = async (req, res) => {
  const { id } = req.params;
  const { nombre, contrasena } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  try {
    const updatedSupervisor = await supervisoresServices.updateSupervisorById(
      id,
      nombre,
      contrasena
    );
    res.json(updatedSupervisor);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const deleteSupervisorById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSupervisor = await supervisoresServices.deleteSupervisorById(
      id
    );
    res.json(deletedSupervisor);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

export default {
  getAllSupervisores,
  getSupervisorById,
  createSupervisor,
  updateSupervisorById,
  deleteSupervisorById,
};
