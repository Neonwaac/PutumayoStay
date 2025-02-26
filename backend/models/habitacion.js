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
  static async obtenerHabitacionPorId(id) {
    try {
      const query = `SELECT habitaciones.id, habitaciones.nombre, habitaciones.descripcion, habitaciones.foto, habitaciones.capacidad, habitaciones.precio, categorias.nombre AS categoria
        FROM habitaciones
        LEFT JOIN categorias ON habitaciones.categoria = categorias.id 
        WHERE habitaciones.id = ?`;
      const [result] = await db.promise().execute(query, [id]);
      if (result.length === 0){
        throw new Error("No se encontro la habitación con ID "+id)
      }
      return result[0];
    } catch (error) {
      throw new Error("Error al obtener la habitacion de la database");
    }
  }
}

module.exports = Habitacion;
