import mongoose from "mongoose";

export function initBaseDeDatos() {
  const DATABASE_URL = process.env.DATABASE_URL;

  mongoose.connection.on("error", (error) => {
    console.error("Error de conexión a la Base de Datos:", error);
  });

  mongoose.connection.on("open", () => {
    console.info("Exitosamente Conectado a la Base de Datos:", DATABASE_URL);
  });

  const conexion = mongoose.connect(DATABASE_URL);
  return conexion;
}