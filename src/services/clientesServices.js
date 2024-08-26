import { db } from "../db.js";

const getAllClientes = async () => {
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

    return allClientes;
  } catch (error) {
    throw error;
  }
};

const getClienteById = async (id) => {
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

    return cliente;
  } catch (error) {
    throw error;
  }
};

const createCliente = async (
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
) => {
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

    return createdCliente;
  } catch (error) {
    throw error;
  }
};

const updateClienteById = async (
  id,
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
) => {
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

    return updatedCliente;
  } catch (error) {
    throw error;
  }
};

const deleteClienteById = async (id) => {
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

    return deletedCliente;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllClientes,
  getClienteById,
  createCliente,
  updateClienteById,
  deleteClienteById,
};
