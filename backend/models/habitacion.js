const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

class Habitacion {
  constructor(nombre, descripcion, capacidad, precio, foto, categoría) {
    (this.nombre = nombre),
      (this.descripcion = descripcion),
      (this.capacidad = capacidad),
      (this.precio = precio),
      (this.foto = foto),
      (this.categoria = categoria);
  }
  static async obtenerTodasLasHabitaciones() {
    try {
      const query = `SELECT habitaciones.id, habitaciones.nombre, habitaciones.descripcion, habitaciones.foto, habitaciones.capacidad, habitaciones.precio, categorias.nombre AS categoria
            FROM habitaciones
            LEFT JOIN categorias ON habitaciones.categoria = categorias.id`;
      const [habitaciones] = await db.promise().execute(query);
      return habitaciones;
    } catch (error) {
      throw new Error("Error al obtener las habitaciones de la database");
    }
  }
}

module.exports = Habitacion;
