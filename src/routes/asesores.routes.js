import { Router } from "express";
import { db } from "../db.js";

const router = Router();

router.get("/asesores", async (req, res) => {
  await db.all("SELECT * FROM asesor", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al obtener los asesores.");
    } else {
      res.status(200).json(rows);
      console.log(rows);
    }
  });
});

router.get("/asesores/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM asesor WHERE idAsesor = ?", [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al obtener el asesor.");
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send("Asesor no encontrado.");
    }
  });
});

router.post("/asesores", (req, res) => {
  const { nombre, contrasena, idSupervisor } = req.body;

  if (!nombre || !contrasena || !idSupervisor) {
    return res
      .status(400)
      .send("Nombre, contraseña e idSupervisor son requeridos.");
  }

  db.run(
    "INSERT INTO asesor (nombre, contrasena, idSupervisor) VALUES (?, ?, ?)",
    [nombre, contrasena, idSupervisor],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al crear el asesor.");
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

router.delete("/asesores/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM asesor WHERE idAsesor = ?", [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al eliminar el asesor.");
    } else if (this.changes > 0) {
      res.status(200).json({ mesage: "Asesore eliminado." });
    } else {
      res.status(404).send("Asesor no encontrado.");
    }
  });
});

router.put("/asesores/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, contrasena, idSupervisor } = req.body;
  db.run(
    "UPDATE asesor SET nombre = ?, contrasena = ?, idSupervisor = ? WHERE idAsesor = ?",
    [nombre, contrasena, idSupervisor, id],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al actualizar el asesor.");
      } else if (this.changes > 0) {
        res.status(200).json({ mesage: "Asesor actualizado" });
      } else {
        res.status(404).send("Asesor no encontrado.");
      }
    }
  );
});

export default router;
