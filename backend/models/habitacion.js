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
      const query = `SELECT habitaciones.id, habitaciones.nombre, habitaciones.descripcion, habitaciones.foto, habitaciones.capacidad, habitaciones.precio, habitaciones.id_empresa, categorias.nombre AS categoria
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
      const query = `SELECT habitaciones.id, habitaciones.nombre, habitaciones.descripcion, 
      habitaciones.foto, habitaciones.capacidad, habitaciones.precio, categorias.nombre AS categoria,
      usuarios.username AS nombre_empresa, usuarios.telefono AS telefono_empresa, usuarios.correo AS correo_empresa, usuarios.foto AS foto_empresa
      FROM habitaciones
      LEFT JOIN categorias ON habitaciones.categoria = categorias.id
      LEFT JOIN usuarios ON habitaciones.id_empresa = usuarios.id
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
  static async crearHabitacion(nombre, descripcion, capacidad, precio, foto, categoria, id_empresa){
    try {
      const uniqueName = await Habitacion.saveImage(foto);
      const photoPath = "http://localhost:8077/uploads/images/"+uniqueName;
      const query = "INSERT INTO habitaciones (nombre, descripcion, capacidad, precio, foto, categoria, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const [habitacion] = await db.promise().execute(query, [nombre, descripcion, capacidad, precio, photoPath, categoria, id_empresa]);
      return habitacion;
    } catch (error) {
      throw new Error("Error al crear la habitacion");
    }
  }
  static async saveImage(foto) {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const newPath = path.join("./uploads/images/", uniqueName+foto.originalname);
      fs.renameSync(foto.path, newPath);
      return uniqueName+foto.originalname;
  }
  static async eliminarHabitacion(id){
    try {
      const query = "DELETE FROM habitaciones WHERE id = ?"
      await db.promise().execute(query, [id])
    } catch (error) {
      throw new Error("Error al eliminar la habitación")
    }

  }
}

module.exports = Habitacion;
