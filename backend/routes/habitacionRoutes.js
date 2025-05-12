const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

router.get("/rooms", habitacionController.obtenerTodasLasHabitaciones);
router.get("/rooms/mostbooked", habitacionController.mostBooked)
router.get("/rooms/category/:category", habitacionController.obtenerHabitacionesPorCategoria);
router.get("/rooms/search/:search", habitacionController.obtenerHabitacionesPorBusqueda);
router.get("/rooms/:id", habitacionController.obtenerHabitacionPorId);
router.post("/rooms", upload.single('foto'),habitacionController.crearHabitacion);
router.delete("/rooms/:id",habitacionController.eliminarHabitacion);

module.exports = router;