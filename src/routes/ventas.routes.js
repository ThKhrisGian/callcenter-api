import { Router } from "express";
import { db } from "../db.js";

const router = Router();

router.get("/ventas", async (req, res) => {
  await db.all("SELECT * FROM venta", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al obtener las ventas.");
    } else {
      res.status(200).json(rows);
      console.log(rows);
    }
  });
});

router.get("/ventas/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM venta WHERE idVenta = ?", [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al obtener la venta.");
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send("Venta no encontrada.");
    }
  });
});

router.post("/ventas", (req, res) => {
  const { oferta, estado, idAsesor, idCliente } = req.body;

  if (!oferta || !estado || !idAsesor || !idCliente) {
    return res.status(400).send("Todos los campos son requeridos.");
  }

  db.run(
    "INSERT INTO venta (oferta, estado, idAsesor, idCliente) VALUES (?, ?, ?, ?)",
    [oferta, estado, idAsesor, idCliente],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al crear la venta.");
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

router.delete("/ventas/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM venta WHERE idVenta = ?", [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al eliminar la venta.");
    } else if (this.changes > 0) {
      res.status(200).json({ message: "Venta eliminada." });
    } else {
      res.status(404).send("Venta no encontrada.");
    }
  });
});

router.put("/ventas/:id", (req, res) => {
  const { id } = req.params;
  const { oferta, estado, idAsesor, idCliente } = req.body;

  db.run(
    "UPDATE venta SET oferta = ?, estado = ?, idAsesor = ?, idCliente = ? WHERE idVenta = ?",
    [oferta, estado, idAsesor, idCliente, id],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al actualizar la venta.");
      } else if (this.changes > 0) {
        res.status(200).json({ message: "Venta actualizada" });
      } else {
        res.status(404).send("Venta no encontrada.");
      }
    }
  );
});

export default router;
