const db = require('../db/db');

class Pago {
    constructor(id_reserva, id_usuario, monto) {
        this.id_reserva = id_reserva;
        this.id_usuario = id_usuario;
        this.monto = monto;
    }

    static async obtenerPagos() {
        try {
            const query = SELECT * FROM historial_pagos;
            const [rows] = await db.promise().execute(query);
            return rows;
        } catch (error) {
            throw new Error(Error al obtener pagos: ${error.message});
        }
    }

    static async crearPago(id_reserva, id_usuario, monto) {
        try {
            const query = INSERT INTO historial_pagos (id_reserva, id_usuario, monto) VALUES (?, ?, ?);
            const [result] = await db.promise().execute(query, [id_reserva, id_usuario, monto]);
            return { id: result.insertId, id_reserva, id_usuario, monto };
        } catch (error) {
            throw new Error(Error al insertar pago: ${error.message});
        }
    }

    static async obtenerPagoPorId(id) {
        try {
            const query = SELECT * FROM historial_pagos WHERE id = ?;
            const [rows] = await db.promise().execute(query, [id]);
            if (rows.length === 0) {
                throw new Error("Pago no encontrado");
            }
            return rows[0];
        } catch (error) {
            throw new Error(Error al obtener pago por ID: ${error.message});
        }
    }

    static async obtenerPagosPorUsuario(id_usuario) {
        try {
            const query = SELECT * FROM historial_pagos WHERE id_usuario = ?;
            const [rows] = await db.promise().execute(query, [id_usuario]);
            return rows;
        } catch (error) {
            throw new Error(Error al obtener pagos por usuario: ${error.message});
        }
    }

    static async obtenerPagosPorReserva(id_reserva) {
        try {
            const query = SELECT * FROM historial_pagos WHERE id_reserva = ?;
            const [rows] = await db.promise().execute(query, [id_reserva]);
            return rows;
        } catch (error) {
            throw new Error(Error al obtener pagos por reserva: ${error.message});
        }
    }

    static async actualizarPago(id, id_reserva, id_usuario, monto) {
        try {
            const query = UPDATE historial_pagos SET id_reserva = ?, id_usuario = ?, monto = ? WHERE id = ?;
            const [result] = await db.promise().execute(query, [id_reserva, id_usuario, monto, id]);
            if (result.affectedRows === 0) {
                throw new Error("Pago no encontrado");
            }
            return { id, id_reserva, id_usuario, monto };
        } catch (error) {
            throw new Error(Error al actualizar pago: ${error.message});
        }
    }

    static async eliminarPago(id) {
        try {
            const query = DELETE FROM historial_pagos WHERE id = ?;
            const [result] = await db.promise().execute(query, [id]);
            if (result.affectedRows === 0) {
                throw new Error("Pago no encontrado");
            }
            return true;
        } catch (error) {
            throw new Error(Error al eliminar pago: ${error.message});
        }
    }
}

module.exports = Pago;