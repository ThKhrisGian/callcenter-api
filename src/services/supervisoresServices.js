import { db } from "../db.js";

const getAllSupervisores = async () => {
  try {
    const allSupervisores = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM supervisor", (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });

    return allSupervisores;
  } catch (error) {
    throw error;
  }
};

const getSupervisorById = async (id) => {
  try {
    const supervisor = await new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM supervisor WHERE idSupervisor = ?",
        [id],
        (err, row) => {
          if (err) {
            return reject(err);
          } else if (row) {
            resolve(row);
          } else {
            resolve({ error: "Supervisor no encontrado" });
          }
        }
      );
    });

    return supervisor;
  } catch (error) {
    throw error;
  }
};
const createSupervisor = async (nombre, contrasena) => {
  try {
    const createdSupervisor = await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO supervisor (nombre, contrasena) VALUES (?, ?)",
        [nombre, contrasena],
        function (err) {
          if (err) {
            return reject(err);
          } else {
            resolve({ message: "Supervisor creado", id: this.lastID });
          }
        }
      );
    });

    return createdSupervisor;
  } catch (error) {
    throw error;
  }
};
const updateSupervisorById = async (id, nombre, contrasena) => {
  try {
    const updatedSupervisor = await new Promise((resolve, reject) => {
      db.run(
        "UPDATE supervisor SET nombre = ?, contrasena = ? WHERE idSupervisor = ?",
        [nombre, contrasena, id],
        function (err) {
          if (err) {
            return reject(err);
          } else if (this.changes > 0) {
            resolve({ message: "Supervisor actualizado" });
          } else {
            resolve({ message: "Supervisor no encontrado." });
          }
        }
      );
    });
    return updatedSupervisor;
  } catch (error) {
    throw error;
  }
};
const deleteSupervisorById = async (id) => {
  try {
    const deletedSupervisor = await new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM supervisor WHERE idSupervisor = ?",
        [id],
        function (err) {
          if (err) {
            return reject(err);
          } else if (this.changes > 0) {
            resolve({ message: "Supervisor eliminado correctamente." });
          } else {
            resolve({ message: "Supervisor no encontrado." });
          }
        }
      );
    });

    return deletedSupervisor;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllSupervisores,
  getSupervisorById,
  createSupervisor,
  updateSupervisorById,
  deleteSupervisorById,
};