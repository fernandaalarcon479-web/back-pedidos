import dotenv from "dotenv";
dotenv.config();

import { initBaseDeDatos } from "./bd/init.js";
import { Pedido } from "./bd/modelos/pedido.js";

await initBaseDeDatos();

// Crear un nuevo pedido
const pedido = new Pedido({
  nombre: "Juan Gabriel Lopez",
  telefono: "4181231234",
  fecha_solicitud: new Date("2026-02-07"),
  fecha_envio: new Date("2026-02-09"),
  total: 45.0,
  pagado: ["PAGADO"],
  abono: 45.0,
  comentario: "Ha sido pagado el pedido",
});

// Guardar en la base de datos
const createdPedido = await pedido.save();

console.log("Pedido creado:", createdPedido);

// Consultar todos los pedidos
const pedidos = await Pedido.find();

console.log("Lista de pedidos:", pedidos);