import { db } from "../db.js";

const getAllVentas = async (req, res) => {
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

    res.json(allVentas);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const getVentaById = async (req, res) => {
  const { id } = req.params;

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

    res.json(venta);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const createVenta = async (req, res) => {
  const { oferta, estado, idAsesor, idCliente } = req.body;

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

    res.json(createdVenta);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const updateVentaById = async (req, res) => {
  const { id } = req.params;
  const { oferta, estado, idAsesor, idCliente } = req.body;

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

    res.json(updatedVenta);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const deleteVentaById = async (req, res) => {
  const { id } = req.params;

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

    res.json(deletedVenta);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

export default {
  getAllVentas,
  getVentaById,
  createVenta,
  updateVentaById,
  deleteVentaById,
};
