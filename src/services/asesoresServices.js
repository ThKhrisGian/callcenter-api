import { db } from "../db.js";

const getAllAsesores = async () => {
  try {
    const allAsesores = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM asesor", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    return allAsesores;
  } catch (error) {
    throw error;
  }
};
const getAsesorById = async (id) => {
  try {
    const asesor = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM asesor WHERE idAsesor = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(row);
        } else {
          resolve({ message: "Asesor no encontrado" });
        }
      });
    });
    return asesor;
  } catch (error) {
    throw error;
  }
};
const createAsesor = async (nombre, contrasena, idSupervisor) => {
  try {
    const createdAsesor = await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO asesor (nombre, contrasena, idSupervisor) VALUES (?, ?, ?)",
        [nombre, contrasena, idSupervisor],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ message: "Asesor creado", id: this.lastID });
          }
        }
      );
    });

    return createdAsesor;
  } catch (error) {
    throw error;
  }
};
const updateAsesorById = (id, nombre, contrasena, idSupervisor) => {
  try {
    const updatedAsesor = new Promise((resolve, reject) => {
      db.run(
        "UPDATE asesor SET nombre = ?, contrasena = ?, idSupervisor = ? WHERE idAsesor = ?",
        [nombre, contrasena, idSupervisor, id],
        function (err) {
          if (err) {
            reject(err);
          } else if (this.changes > 0) {
            resolve({ message: "Asesor actualizado correctamente." });
          } else {
            resolve({ message: "Asesor no encontrado" });
          }
        }
      );
    });

    return updatedAsesor;
  } catch (error) {
    throw error;
  }
};
const deleteAsesorById = async (id) => {
  try {
    const deletedAsesor = await new Promise((resolve, reject) => {
      db.run("DELETE FROM asesor WHERE idAsesor = ?", [id], function (err) {
        if (err) {
          reject(err);
        } else if (this.changes > 0) {
          resolve({ message: "Asesor eliminado correctamente." });
        } else {
          resolve({ message: "Asesor no encontrado." });
        }
      });
    });

    return deletedAsesor;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllAsesores,
  getAsesorById,
  createAsesor,
  updateAsesorById,
  deleteAsesorById,
};
