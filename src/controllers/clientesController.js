import { db } from "../db.js";

const getAllClientes = async (req, res) => {
  try {
    const allClientes = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM cliente", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.json(allClientes);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const getClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM cliente WHERE idCliente = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(row);
        } else {
          resolve({ message: "Cliente no encontrado" });
        }
      });
    });

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
    const createdCliente = await new Promise((resolve) => {
      db.run(
        "INSERT INTO cliente (nombre, dni, fecha_nacimiento, email, direccion, provincia, distrito, cp, num_fijo, num_moviles, cuentaBancaria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        ],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ message: "Cliente creado", id: this.lastID });
          }
        }
      );
    });

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
    const deletedCliente = await new Promise((resolve, reject) => {
      db.run("DELETE FROM cliente WHERE idCliente = ?", [id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes > 0) {
          resolve({ message: "Cliente eliminado correctamente." });
        } else {
          resolve({ message: "Cliente no encontrado" });
        }
      });
    });

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
