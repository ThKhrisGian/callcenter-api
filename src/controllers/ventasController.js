import ventasServices from "../services/ventasServices.js";

const getAllVentas = async (req, res) => {
  try {
    const allVentas = await ventasServices.getAllVentas();
    res.json(allVentas);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const getVentaById = async (req, res) => {
  const { id } = req.params;

  try {
    const venta = await ventasServices.getVentaById(id);
    res.json(venta);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const createVenta = async (req, res) => {
  const { oferta, estado, idAsesor, idCliente } = req.body;

  try {
    const createdVenta = await ventasServices.createVenta(
      oferta,
      estado,
      idAsesor,
      idCliente
    );

    res.json(createdVenta);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const updateVentaById = async (req, res) => {
  const { id } = req.params;
  const { oferta, estado, idAsesor, idCliente } = req.body;

  try {
    const updatedVenta = await ventasServices.updateVentaById(
      id,
      oferta,
      estado,
      idAsesor,
      idCliente
    );
    res.json(updatedVenta);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

const deleteVentaById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVenta = await ventasServices.deleteVentaById(id);

    res.json(deletedVenta);
  } catch (error) {
    res.json({ error: error?.message || error });
  }
};

export default {
  getAllVentas,
  getVentaById,
  createVenta,
  updateVentaById,
  deleteVentaById,
};
