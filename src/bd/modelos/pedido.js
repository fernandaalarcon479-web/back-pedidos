import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    telefono: { type: String, required: true, length: 10 },
    fecha_solicitud: { type: Date, required: true },
    fecha_envio: { type: Date, required: true },
    total: { type: Number, default: 0.0 },
    pagado: [String],
    abono: { type: Number },
    comentario: { type: String },
  },
  { timestamps: true }
);

export const Pedido = mongoose.model("pedido", pedidoSchema);