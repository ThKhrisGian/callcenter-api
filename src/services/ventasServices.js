import { db } from "../db.js";

const getAllVentas = async () => {
  try {
    const allVentas = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM venta", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    return allVentas;
  } catch (error) {
    throw error;
  }
};

const getVentaById = async (id) => {
  try {
    const venta = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM venta WHERE idVenta = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(row);
        } else {
          resolve({ message: "Venta no encontrada." });
        }
      });
    });

    return venta;
  } catch (error) {
    throw error;
  }
};

const createVenta = async (oferta, estado, idAsesor, idCliente) => {
  try {
    const createdVenta = await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO venta (oferta, estado, idAsesor, idCliente) VALUES (?, ?, ?, ?)",
        [oferta, estado, idAsesor, idCliente],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ message: "Venta creada", id: this.lastID });
          }
        }
      );
    });

    return createdVenta;
  } catch (error) {
    throw error;
  }
};

const updateVentaById = async (id, oferta, estado, idAsesor, idCliente) => {
  try {
    const updatedVenta = await new Promise((resolve, reject) => {
      db.run(
        "UPDATE venta SET oferta = ?, estado = ?, idAsesor = ?, idCliente = ? WHERE idVenta = ?",
        [oferta, estado, idAsesor, idCliente, id],
        function (err) {
          if (err) {
            reject(err);
          } else if (this.changes > 0) {
            resolve({ message: "Venta actualizada" });
          } else {
            resolve({ message: "Venta no encontrada" });
          }
        }
      );
    });

    return updatedVenta;
  } catch (error) {
    throw error;
  }
};

const deleteVentaById = async (id) => {
  try {
    const deletedVenta = await new Promise((resolve, reject) => {
      db.run("DELETE FROM venta WHERE idVenta = ?", [id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes > 0) {
          resolve({ message: "Venta eliminada correctamente." });
        } else {
          resolve({ message: "Venta no encontrada." });
        }
      });
    });

    return deletedVenta;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllVentas,
  getVentaById,
  createVenta,
  updateVentaById,
  deleteVentaById,
};
