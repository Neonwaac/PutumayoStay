const Reserva = require("../models/reserva");
require("dotenv").config();

exports.crearReserva = async (req, res) => {
  try {
    const { monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion } =
      req.body;
    await Reserva.crearReserva(
      monto,
      fecha_ingreso,
      fecha_salida,
      id_usuario,
      id_habitacion
    );
    res.status(200).json("Reserva creada correctamente");
  } catch (error) {
    res.status(500).json("No se pudo crear la reserva");
  }
};
exports.obtenerReservas = async (req, res) => {
  const { id } = req.params;
  try {
    const reservas = await Reserva.obtenerReservas(id);
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json("No se pudieron obtener las reservas");
  }
};
exports.generarPDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, noches, timestamp, estado, nombre } = req.body;
    const response = await Reserva.generarPDF(id, monto, noches, timestamp, estado, nombre);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).json({ error: "No se pudo generar el PDF" });
  }
};
