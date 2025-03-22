const db = require("../db/db");
const fs = require("fs").promises;
const cloudinary = require("../cloudinaryConfig");
const FileType = require('file-type');
class Habitacion {
  constructor(nombre, descripcion, capacidad, precio, foto, categoria) {
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
            LEFT JOIN categorias ON habitaciones.categoria = categorias.id
            ORDER BY habitaciones.id DESC`;
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
  static async crearHabitacion(nombre, descripcion, capacidad, precio, foto, categoria, id_empresa) {
    try {
        const photoUrl = await Habitacion.saveImage(foto);

        const query = "INSERT INTO habitaciones (nombre, descripcion, capacidad, precio, foto, categoria, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const [habitacion] = await db.promise().execute(query, [nombre, descripcion, capacidad, precio, photoUrl, categoria, id_empresa]);
        return habitacion;
    } catch (error) {
        console.error("Error en la creación de la habitación:", error);
        throw new Error("Error al crear la habitacion: " + error.message);
    }
}


static async saveImage(foto) {
  try {
      if (!foto || !foto.path) {
          throw new Error("No se proporcionó una imagen válida");
      }
      const fileType = await FileType.fromFile(foto.path);
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!fileType || !allowedTypes.includes(fileType.mime)) {
          await fs.unlink(foto.path); 
          throw new Error("El archivo no es una imagen válida, Archivos válidos: jpeg, png, webp");
      }
      const stats = await fs.stat(foto.path);
      if (stats.size > 2 * 1024 * 1024) {
          await fs.unlink(foto.path);
          throw new Error("El archivo es demasiado grande (máximo 2MB)");
      }
      const resultado = await cloudinary.uploader.upload(foto.path, {
          folder: "images",
          format: "webp",
          transformation: [{ width: 800, quality: "auto" }]
      });
      await fs.unlink(foto.path);
      return resultado.secure_url;
  } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error);
      throw error;
  }
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

module.exports = Habitacion;