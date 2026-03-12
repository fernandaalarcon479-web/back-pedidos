import {
  creaPedido,
  listaAllPedidos,
  listaPedidosByNombre,
  listPedidosByPagado,
  getPedidoById,
  modificaPedido,
  eliminaPedido
} from "../servicios/pedidos.js";

export function pedidosRoutes(app) {

  // Listar pedidos
  app.get("/api/v1/pedidos", async (req, res) => {
    const { sortBy, sortOrder, nombre, pagado } = req.query;
    const opciones = { sortBy, sortOrder };

    try {
      if (nombre && pagado) {
        return res
          .status(400)
          .json({ error: "Consulta por nombre o pagado, no ambos" });
      } else if (nombre) {
        return res.json(await listaPedidosByNombre(nombre, opciones));
      } else if (pagado) {
        return res.json(await listPedidosByPagado(pagado, opciones));
      } else {
        return res.json(await listaAllPedidos(opciones));
      }
    } catch (err) {
      console.error("Error listando pedidos", err);
      return res.status(500).end();
    }
  });

  // Obtener por ID
  app.get("/api/v1/pedidos/:id", async (req, res) => {
    try {
      const pedido = await getPedidoById(req.params.id);
      if (!pedido) return res.status(404).end();
      return res.json(pedido);
    } catch (err) {
      console.error("Error obteniendo pedido", err);
      return res.status(500).end();
    }
  });

  // Crear pedido
  app.post("/api/v1/pedidos", async (req, res) => {
    try {
      const pedido = await creaPedido(req.body);
      return res.status(201).json(pedido);
    } catch (err) {
      console.error("Error creando pedido", err);
      return res.status(500).end();
    }
  });

  // Modificar pedido
  app.patch("/api/v1/pedidos/:id", async (req, res) => {
    try {
      const pedido = await modificaPedido(req.params.id, req.body);
      return res.json(pedido);
    } catch (err) {
      console.error("Error modificando pedido", err);
      return res.status(500).end();
    }
  });

  // Eliminar pedido
  app.delete("/api/v1/pedidos/:id", async (req, res) => {
    try {
      const { deletedCount } = await eliminaPedido(req.params.id);
      if (deletedCount === 0) return res.sendStatus(404);
      return res.status(204).end();
    } catch (err) {
      console.error("Error eliminando pedido", err);
      return res.status(500).end();
    }
  });

}