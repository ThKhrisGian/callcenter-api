import clientesServices from "../services/clientesServices.js";
import { db } from "../db.js";
import supervisoresServices from "../services/supervisoresServices.js";

const getAllClientes = async (req, res) => {
  try {
    const allClientes = await clientesServices.getAllClientes();
    res.json(allClientes);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const getClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await clientesServices.getClienteById(id);

    res.json(cliente);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const createCliente = async (req, res) => {
  const {
    nombre,
    dni,
    fecha_nacimiento,
    email,
    direccion,
    provincia,
    distrito,
    cp,
    num_fijo,
    num_moviles,
    cuentaBancaria,
  } = req.body;

  try {
    const createdCliente = await clientesServices.createCliente(
      nombre,
      dni,
      fecha_nacimiento,
      email,
      direccion,
      provincia,
      distrito,
      cp,
      num_fijo,
      num_moviles,
      cuentaBancaria
    );

    res.json(createdCliente);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const updateClienteById = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    dni,
    fecha_nacimiento,
    email,
    direccion,
    provincia,
    distrito,
    cp,
    num_fijo,
    num_moviles,
    cuentaBancaria,
  } = req.body;

  try {
    const updatedCliente = await new Promise((resolve, reject) => {
      db.run(
        "UPDATE cliente SET nombre = ?, dni = ?, fecha_nacimiento = ?, email = ?, direccion = ?, provincia = ?, distrito = ?, cp = ?, num_fijo = ?, num_moviles = ?, cuentaBancaria = ? WHERE idCliente = ?",
        [
          nombre,
          dni,
          fecha_nacimiento,
          email,
          direccion,
          provincia,
          distrito,
          cp,
          num_fijo,
          num_moviles,
          cuentaBancaria,
          id,
        ],
        function (err) {
          if (err) {
            reject(err);
          } else if (this.changes > 0) {
            resolve({ message: "Cliente actualizado" });
          } else {
            resolve({ message: " Cliente no encontrado" });
          }
        }
      );
    });

    res.json(updatedCliente);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const deleteClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCliente = await clientesServices.deleteClienteById(id);
    res.json(deletedCliente);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

export default {
  getAllClientes,
  getClienteById,
  createCliente,
  updateClienteById,
  deleteClienteById,
};
