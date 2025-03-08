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
}
module.exports = Reserva;