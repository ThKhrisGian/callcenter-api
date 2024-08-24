import { db } from "../db.js";

const getAllSupervisores = async () => {
  return await new Promise((resolve, reject) => {
    db.all("SELECT * FROM supervisor", (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getSupervisorById = () => {};
const createSupervisor = () => {};
const updateSupervisorById = () => {};
const deleteSupervisorById = () => {};

export default {
  getAllSupervisores,
  getSupervisorById,
  createSupervisor,
  updateSupervisorById,
  deleteSupervisorById,
};
