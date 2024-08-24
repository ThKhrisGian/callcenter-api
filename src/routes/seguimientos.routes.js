import { Router } from "express";
import { db } from "../db.js";

const router = Router();

// Obtener todos los seguimientos
router.get("/seguimientos", (req, res) => {
  db.all("SELECT * FROM seguimiento", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al obtener los seguimientos.");
    } else {
      res.status(200).json(rows);
    }
  });
});

// Obtener un seguimiento por id
router.get("/seguimientos/:id", (req, res) => {
  const { id } = req.params;
  db.get(
    "SELECT * FROM seguimiento WHERE idSeguimiento = ?",
    [id],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al obtener el seguimiento.");
      } else if (row) {
        res.status(200).json(row);
      } else {
        res.status(404).send("Seguimiento no encontrado.");
      }
    }
  );
});

// Crear un nuevo seguimiento
router.post("/seguimientos", (req, res) => {
  const { texto, fecha, idVenta } = req.body;

  if (!texto || !fecha || !idVenta) {
    return res.status(400).send("Texto, fecha e idVenta son requeridos.");
  }

  db.run(
    "INSERT INTO seguimiento (texto, fecha, idVenta) VALUES (?, ?, ?)",
    [texto, fecha, idVenta],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al crear el seguimiento.");
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

// Eliminar un seguimiento por id
router.delete("/seguimientos/:id", (req, res) => {
  const { id } = req.params;
  db.run(
    "DELETE FROM seguimiento WHERE idSeguimiento = ?",
    [id],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al eliminar el seguimiento.");
      } else if (this.changes > 0) {
        res.status(200).json({ message: "Seguimiento eliminado." });
      } else {
        res.status(404).send("Seguimiento no encontrado.");
      }
    }
  );
});

// Actualizar un seguimiento por id
router.put("/seguimientos/:id", (req, res) => {
  const { id } = req.params;
  const { texto, fecha, idVenta } = req.body;

  if (!texto || !fecha || !idVenta) {
    return res.status(400).send("Texto, fecha e idVenta son requeridos.");
  }

  db.run(
    "UPDATE seguimiento SET texto = ?, fecha = ?, idVenta = ? WHERE idSeguimiento = ?",
    [texto, fecha, idVenta, id],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al actualizar el seguimiento.");
      } else if (this.changes > 0) {
        res.status(200).json({ message: "Seguimiento actualizado" });
      } else {
        res.status(404).send("Seguimiento no encontrado.");
      }
    }
  );
});

export default router;
