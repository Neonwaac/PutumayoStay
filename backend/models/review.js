const db = require("../db/db");
class Review{
    constructor(valor, descripcion, id_usuario, id_habitacion){
        this.valor = valor,
        this.descripcion = descripcion,
        this.id_usuario =  id_usuario,
        this.id_habitacion = id_habitacion
    }
    static async ObtenerReviews(){
        try {
            const query = `SELECT reviews.id, reviews.valor, reviews.descripcion, reviews.timestamp, 
            usuarios.username AS nombre_usuario, usuarios.foto AS foto_usuario,
            habitaciones.nombre AS nombre_habitacion
            FROM reviews
            LEFT JOIN habitaciones ON reviews.id_habitacion = habitaciones.id
            LEFT JOIN usuarios ON reviews.id_usuario = usuarios.id;
            `
            const [reviews] = await db.promise().execute(query);
            return reviews
        } catch (error) {
            throw new Error("Error al obtener las reviews de la database");
        }
    }
    static async ObtenerReviewsPorHabitacion(id){
        try {
            const query = `SELECT reviews.id, reviews.valor, reviews.descripcion, reviews.timestamp, 
            usuarios.username AS nombre_usuario, usuarios.foto AS foto_usuario,
            habitaciones.nombre AS nombre_habitacion
            FROM reviews
            LEFT JOIN habitaciones ON reviews.id_habitacion = habitaciones.id
            LEFT JOIN usuarios ON reviews.id_usuario = usuarios.id
            WHERE habitaciones.id = ?
            `
            const [reviews] = await db.promise().execute(query, [id]);
            return reviews
        } catch (error) {
            throw new Error("Error al obtener las reviews de la database");
        }
    }
}
module.exports = Review;