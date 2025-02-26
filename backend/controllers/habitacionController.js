const Habitacion = require('../models/habitacion');
//MANEJO DE IMAGENES
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

exports.obtenerTodasLasHabitaciones = async(req, res) => {
    try{
        const habitaciones = await Habitacion.obtenerTodasLasHabitaciones();
        res.status(200).json(habitaciones)
    }catch(error){
        res.status(500).json({message: 'Error al obtener las habitaciones'})
    }
}

exports.obtenerHabitacionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const habitacion = await Habitacion.obtenerHabitacionPorId(id);
        res.status(200).json(habitacion)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener la habitacion'})
    }
}