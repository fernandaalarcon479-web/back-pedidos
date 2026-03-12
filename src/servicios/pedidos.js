import { Pedido } from "../bd/modelos/pedido.js";

// Crear pedido
export async function creaPedido({
  nombre,
  telefono,
  fecha_solicitud,
  fecha_envio,
  total,
  pagado,
  abono,
  comentario,
}) {
  const pedido = new Pedido({
    nombre,
    telefono,
    fecha_solicitud,
    fecha_envio,
    total,
    pagado,
    abono,
    comentario,
  });

  return await pedido.save();
}

// Listar pedidos
export async function listaPedidos(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {}
) {
  return await Pedido.find(query).sort({ [sortBy]: sortOrder });
}

// Listar todos
export async function listaAllPedidos(opciones) {
  return await listaPedidos({}, opciones);
}

// Buscar por nombre
export async function listaPedidosByNombre(nombre, opciones) {
  return await listaPedidos({ nombre }, opciones);
}

// Buscar por pagado
export async function listPedidosByPagado(pagado, opciones) {
  return await listaPedidos({ pagado }, opciones);
}

// Obtener por ID
export async function getPedidoById(pedidoId) {
  return await Pedido.findById(pedidoId);
}

// Modificar
export async function modificaPedido(
  pedidoId,
  {
    nombre,
    telefono,
    fecha_solicitud,
    fecha_envio,
    total,
    pagado,
    abono,
    comentario,
  }
) {
  return await Pedido.findOneAndUpdate(
    { _id: pedidoId },
    {
      $set: {
        nombre,
        telefono,
        fecha_solicitud,
        fecha_envio,
        total,
        pagado,
        abono,
        comentario,
      },
    },
    { new: true }
  );
}

// Eliminar
export async function eliminaPedido(pedidoId) {
  return await Pedido.deleteOne({ _id: pedidoId });
}