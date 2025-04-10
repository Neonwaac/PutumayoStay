const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

// Rutas para gestión de pagos
router.get('/pagos', pagoController.obtenerPagos);
router.post('/pagos', pagoController.crearPago);
router.get('/pagos/:id', pagoController.obtenerPagoPorId);
router.get('/pagos/usuario/:id_usuario', pagoController.obtenerPagosPorUsuario);
router.get('/pagos/reserva/:id_reserva', pagoController.obtenerPagosPorReserva);
router.put('/pagos/:id', pagoController.actualizarPago);
router.delete('/pagos/:id', pagoController.eliminarPago);

module.exports = router;