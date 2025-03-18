const db = require('../db/db');

class Reserva{
    constructor(monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion){
        this.monto = monto,
        this.fecha_ingreso = fecha_ingreso,
        this.fecha_salida = fecha_salida,
        this.id_usuario = id_usuario,
        this.id_habitacion = id_habitacion
    }
    static async crearReserva(monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion){
        try {
         const query = `INSERT INTO reservas (monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion) VALUES (?, ?, ?, ?, ?)`
         db.promise().execute(query, [monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion])
         return;
        } catch (error) {
            throw error
        }
    }
    static async obtenerReservas(id){
        try {
            const query = `SELECT r.id, r.monto, TIMESTAMPDIFF(DAY, r.fecha_ingreso, r.fecha_salida) AS noches, 
            r.timestamp, r.estado, h.nombre, h.foto FROM reservas as r
            INNER JOIN habitaciones as h ON r.id_habitacion = h.id
            WHERE r.estado > 0 AND r.id_usuario = ?
            ORDER BY r.timestamp DESC;`
            const [reservas] = await db.promise().execute(query, [id])
            return reservas;  
        } catch (error) {
            throw error
        }
    }
}
module.exports = Reserva;