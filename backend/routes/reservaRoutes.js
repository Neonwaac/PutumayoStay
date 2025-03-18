const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/reservas', reservaController.crearReserva)
router.get('/reservas/:id', reservaController.obtenerReservas)
router.post('/reservas/generarPDF/:id', reservaController.generarPDF);
module.exports = router;