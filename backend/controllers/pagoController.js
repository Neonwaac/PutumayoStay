const Pago = require('../models/pago');

exports.obtenerPagos = async (req, res) => {
    try {
        const pagos = await Pago.obtenerPagos();
        res.status(200).json(pagos);
    } catch (error) {
        console.error('Error al obtener pagos:', error);
        res.status(500).json({ message: 'Hubo un error al obtener los pagos', error: error.message });
    }
};

exports.crearPago = async (req, res) => {
    const { id_reserva, id_usuario, monto } = req.body;
    if (!id_reserva || !id_usuario || !monto) {
        return res.status(400).json({ message: 'Faltan campos por llenar' });
    }
    try {
        const pagoCreado = await Pago.crearPago(id_reserva, id_usuario, monto);
        res.status(201).json({ message: 'Pago registrado correctamente', pago: pagoCreado });
    } catch (error) {
        console.error('Error al crear pago:', error);
        res.status(500).json({ message: 'Hubo un error al registrar el pago', error: error.message });
    }
};

exports.obtenerPagoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const pago = await Pago.obtenerPagoPorId(id);
        if (!pago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.status(200).json(pago);
    } catch (error) {
        console.error('Error al obtener pago:', error);
        res.status(500).json({ message: 'Hubo un error al obtener el pago', error: error.message });
    }
};

exports.obtenerPagosPorUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const pagos = await Pago.obtenerPagosPorUsuario(id_usuario);
        res.status(200).json(pagos);
    } catch (error) {
        console.error('Error al obtener pagos del usuario:', error);
        res.status(500).json({ message: 'Hubo un error al obtener los pagos del usuario', error: error.message });
    }
};

exports.obtenerPagosPorReserva = async (req, res) => {
    const { id_reserva } = req.params;
    try {
        const pagos = await Pago.obtenerPagosPorReserva(id_reserva);
        res.status(200).json(pagos);
    } catch (error) {
        console.error('Error al obtener pagos de la reserva:', error);
        res.status(500).json({ message: 'Hubo un error al obtener los pagos de la reserva', error: error.message });
    }
};

exports.actualizarPago = async (req, res) => {
    const { id } = req.params;
    const { id_reserva, id_usuario, monto } = req.body;
    
    if (!id_reserva || !id_usuario || !monto) {
        return res.status(400).json({ message: 'Faltan campos por llenar' });
    }
    
    try {
        const pagoActualizado = await Pago.actualizarPago(id, id_reserva, id_usuario, monto);
        res.status(200).json({ message: 'Pago actualizado correctamente', pago: pagoActualizado });
    } catch (error) {
        console.error('Error al actualizar pago:', error);
        res.status(500).json({ message: 'Hubo un error al actualizar el pago', error: error.message });
    }
};

exports.eliminarPago = async (req, res) => {
    const { id } = req.params;
    try {
        await Pago.eliminarPago(id);
        res.status(200).json({ message: 'Pago eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar pago:', error);
        res.status(500).json({ message: 'Hubo un error al eliminar el pago', error: error.message });
    }
};