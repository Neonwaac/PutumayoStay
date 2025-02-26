const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

router.get("/rooms", habitacionController.obtenerTodasLasHabitaciones);
router.get("/rooms/:id", habitacionController.obtenerHabitacionPorId)
module.exports = router;