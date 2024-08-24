import express from "express";
import cors from "cors";
import supervisoresRoutes from "./routes/supervisores.routes.js";
import asesoresRoutes from "./routes/asesores.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import seguimientosRoutes from "./routes/seguimientos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(supervisoresRoutes);
app.use(asesoresRoutes);
app.use(clientesRoutes);
app.use(seguimientosRoutes);
app.use(ventasRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
