const Reserva = require('../models/reserva')

exports.crearReserva = async (req, res) => {
    try {
        const { monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion} = req.body;
        await Reserva.crearReserva(monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion);
        res.status(200).json('Reserva creada correctamente')
    } catch (error) {
        res.status(500).json('No se pudo crear la reserva')
    }
}