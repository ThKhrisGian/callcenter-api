import { db } from "../db.js";

const getAllSeguimientos = async (req, res) => {
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

    res.json(allSeguimientos);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const getSeguimientoById = async (req, res) => {
  const { id } = req.params;

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

    res.json(seguimiento);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const createSeguimiento = async (req, res) => {
  const { texto, fecha, idVenta } = req.body;

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

    res.json(createdSeguimiento);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const updateSeguimientoById = async (req, res) => {
  const { id } = req.params;
  const { texto, fecha, idVenta } = req.body;

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

    res.json(updatedSeguimiento);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const deleteSeguimientoById = async (req, res) => {
  const { id } = req.params;

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

  res.json(deletedSeguimiento);
};

export default {
  getAllSeguimientos,
  getSeguimientoById,
  createSeguimiento,
  updateSeguimientoById,
  deleteSeguimientoById,
};
