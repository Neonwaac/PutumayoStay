const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/reservas', reservaController.crearReserva)
router.get('/reservas/:id', reservaController.obtenerReservas);
router.get('/reservas/history/:id', reservaController.obtenerHistorialReservas);
router.patch('/reservas/:estado/:id', reservaController.actualizarEstadoReserva);
router.post('/reservas/generarPDF/:id', reservaController.generarPDF);
module.exports = router;