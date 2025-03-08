const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/reservas', reservaController.crearReserva)

module.exports = router;