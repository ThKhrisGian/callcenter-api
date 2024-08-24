import { Router } from "express";
import { db } from "../db.js";

const router = Router();

router.get("/supervisores", async (req, res) => {
  await db.all("SELECT * FROM supervisor", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al obtener los supervisores.");
    } else {
      res.status(201).json(rows);
      console.log(rows);
    }
  });
});

router.get("/supervisores/:id", (req, res) => {
  const { id } = req.params;
  db.get(
    "SELECT * FROM supervisor WHERE idSupervisor = ?",
    [id],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al obtener el supervisor.");
      } else if (row) {
        res.json(row);
      } else {
        res.status(404).send("Supervisor no encontrado.");
      }
    }
  );
});

router.post("/supervisores", (req, res) => {
  const { nombre, contrasena } = req.body;

  if (!nombre || !contrasena) {
    return res.status(400).send("Nombre y contraseña son requeridos.");
  }

  db.run(
    "INSERT INTO supervisor (nombre, contrasena) VALUES (?, ?)",
    [nombre, contrasena],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ id: this.lastID });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

router.delete("/supervisores/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM supervisor WHERE idSupervisor = ?", [id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al eliminar el supervisor.");
    } else if (this.changes > 0) {
      res.status(200).json({ message: 'Supervisor eliminado correctamente' })
    } else {
      res.status(404).send("Supervisor no encontrado.");
    }
  });
});

router.put("/supervisores/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, contrasena } = req.body;
  db.run("UPDATE supervisor SET nombre = ?, contrasena = ? WHERE idSupervisor = ?", [nombre, contrasena, id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al actualizar el supervisor.");
    } else if (this.changes > 0) {
      res.status(200).json({mensaje: "Supervisor actualizado"});
    } else {
      res.status(404).send("Supervisor no encontrado.");
    }
  });
});

export default router;