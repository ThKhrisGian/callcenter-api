import { db } from "../db.js";

const getAllSeguimientos = async () => {
  try {
    const allSeguimientos = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM seguimiento", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    return allSeguimientos;
  } catch (error) {
    throw error;
  }
};
const getSeguimientoById = async (id) => {
  try {
    const seguimiento = await new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM seguimiento WHERE idSeguimiento = ?",
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(row);
          } else {
            resolve({ message: "Seguimiento no encontrado." });
          }
        }
      );
    });

    return seguimiento;
  } catch (error) {
    throw error;
  }
};
const createSeguimiento = async (texto, fecha, idVenta) => {
  try {
    const createdSeguimiento = await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO seguimiento (texto, fecha, idVenta) VALUES (?, ?, ?)",
        [texto, fecha, idVenta],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ message: "Seguimiento creado", id: this.lastID });
          }
        }
      );
    });

    return createdSeguimiento;
  } catch (error) {
    throw error;
  }
};
const updateSeguimientoById = async (id, texto, fecha, idVenta) => {
  try {
    const updatedSeguimiento = await new Promise((resolve, reject) => {
      db.run(
        "UPDATE seguimiento SET texto = ?, fecha = ?, idVenta = ? WHERE idSeguimiento = ?",
        [texto, fecha, idVenta, id],
        function (err) {
          if (err) {
            reject(err);
          } else if (this.changes > 0) {
            resolve({ message: "Seguimiento actualizado" });
          } else {
            resolve({ message: "Seguimiento no encontrado." });
          }
        }
      );
    });

    return updatedSeguimiento;
  } catch (error) {
    throw error;
  }
};
const deleteSeguimientoById = async (id) => {
  try {
    const deletedSeguimiento = await new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM seguimiento WHERE idSeguimiento = ?",
        [id],
        function (err) {
          if (err) {
            reject(err);
          } else if (this.changes > 0) {
            resolve({ message: "Seguimiento eliminado correctamente." });
          } else {
            resolve({ message: "Seguimiento no encontrado." });
          }
        }
      );
    });

    return deletedSeguimiento;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllSeguimientos,
  getSeguimientoById,
  createSeguimiento,
  updateSeguimientoById,
  deleteSeguimientoById,
};
