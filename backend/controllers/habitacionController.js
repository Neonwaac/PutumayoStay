const Habitacion = require("../models/habitacion");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

exports.obtenerTodasLasHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.obtenerTodasLasHabitaciones();
    res.status(200).json(habitaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las habitaciones" });
  }
};

exports.obtenerHabitacionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const habitacion = await Habitacion.obtenerHabitacionPorId(id);
    res.status(200).json(habitacion);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la habitacion" });
  }
};
exports.crearHabitacion = async (req, res) => {
  try {
    const { nombre, descripcion, capacidad, precio, categoria, id_empresa } = req.body;
    const foto = req.file || null;

    const habitacion = await Habitacion.crearHabitacion(
      nombre,
      descripcion,
      capacidad,
      precio,
      foto,
      categoria,
      id_empresa
    );

    res.status(200).json({ message: "Habitación creada correctamente", habitacion });
  } catch (error) {
    console.error("Error en crearHabitacion:", error);
    res.status(500).json({ 
      message: "Error al crear la habitación", 
      error: error.message, 
      stack: error.stack || null
    });
  }
};

exports.eliminarHabitacion = async (req, res) => {
  const { id } = req.params;
  try {
    await Habitacion.eliminarHabitacion(id);
    res.status(200).json({ message: "Habitación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "No se pudo eliminar la habitación" });
  }
};
exports.mostBooked = async (req, res) => {
  try {
    const habitaciones = await Habitacion.mostBooked();
    res.status(200).json(habitaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las habitaciones" });
  }
}

exports.obtenerHabitacionesPorCategoria = async (req, res) => {
  const { category } = req.params;
  try{
    const habitaciones = await Habitacion.obtenerHabitacionesPorCategoria(category)
    if(!habitaciones) {
      return res.status(404).json({ message: "No se encontraron habitaciones para esta categoria" });
    }
    res.status(200).json(habitaciones);
  }catch(error){
    res.status(500).json({ message: "Error al obtener las habitaciones por categoria" });
  }
}

exports.obtenerHabitacionesPorBusqueda = async (req, res) => {
  const {search} = req.params;
  try{
    const habitaciones = await Habitacion.obtenerHabitacionesPorBusqueda(search)
    if(!habitaciones) {
      return res.status(404).json({ message: "No se encontraron habitaciones para esta busqueda" });
    }
    res.status(200).json(habitaciones);
  }catch(error){
    res.status(500).json({ message: "Error al obtener las habitaciones por busqueda" });
  }
}

