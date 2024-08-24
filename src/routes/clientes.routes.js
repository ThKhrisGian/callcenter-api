import { Router } from "express";
import { db } from "../db.js";

const router = Router();

router.get("/clientes", async (req, res) => {
  await db.all("SELECT * FROM cliente", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al obtener los clientes.");
    } else {
      res.status(200).json(rows);
      console.log(rows);
    }
  });
});

router.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM cliente WHERE idCliente = ?", [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al obtener el cliente.");
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send("Cliente no encontrado.");
    }
  });
});

router.post("/clientes", (req, res) => {
  const {
    nombre,
    dni,
    fecha_nacimiento,
    email,
    direccion,
    provincia,
    distrito,
    cp,
    num_fijo,
    num_moviles,
    cuentaBancaria,
  } = req.body;

  if (
    !nombre ||
    !dni ||
    !fecha_nacimiento ||
    !email ||
    !direccion ||
    !provincia ||
    !distrito ||
    !cp
  ) {
    return res.status(400).send("Todos los campos son requeridos.");
  }

  db.run(
    "INSERT INTO cliente (nombre, dni, fecha_nacimiento, email, direccion, provincia, distrito, cp, num_fijo, num_moviles, cuentaBancaria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nombre,
      dni,
      fecha_nacimiento,
      email,
      direccion,
      provincia,
      distrito,
      cp,
      num_fijo,
      num_moviles,
      cuentaBancaria,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al crear el cliente.");
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

router.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM cliente WHERE idCliente = ?", [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error al eliminar el cliente.");
    } else if (this.changes > 0) {
      res.status(200).json({ message: "Cliente eliminado" });
    } else {
      res.status(404).send("Cliente no encontrado.");
    }
  });
});

router.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    dni,
    fecha_nacimiento,
    email,
    direccion,
    provincia,
    distrito,
    cp,
    num_fijo,
    num_moviles,
    cuentaBancaria,
  } = req.body;

  db.run(
    "UPDATE cliente SET nombre = ?, dni = ?, fecha_nacimiento = ?, email = ?, direccion = ?, provincia = ?, distrito = ?, cp = ?, num_fijo = ?, num_moviles = ?, cuentaBancaria = ? WHERE idCliente = ?",
    [
      nombre,
      dni,
      fecha_nacimiento,
      email,
      direccion,
      provincia,
      distrito,
      cp,
      num_fijo,
      num_moviles,
      cuentaBancaria,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error al actualizar el cliente.");
      } else if (this.changes > 0) {
        res.status(200).json({ message: "Cliente Actualizado" });
      } else {
        res.status(404).send("Cliente no encontrado.");
      }
    }
  );
});

export default router;
