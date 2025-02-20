const Usuario = require('../models/usuario');
//MANEJO DE IMAGENES
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

exports.crearUsuario = async (req, res) => {
    //SOLO RECIBE 3 PARAMETROS DEBIDO A QUE EL RESTO DE PROPIEDADES DEL USUARIO PUEDEN SER NULAS
    //Y SE AGREGAN A LA HORA DE EDITAR EL USUARIO
    const { correo, username, password } = req.body;
    if (!correo || !username || !password) {
        return res.status(400).json({ message: 'Faltan campos por llenar' });
    }
    try {
        const usuarioCreado = await Usuario.crearUsuario(correo, username, password);
        res.status(201).json({ message: 'Usuario creado correctamente', usuario: usuarioCreado });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Hubo un error al crear el usuario', error: error.message });
    }
};
exports.editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { correo, username, password, foto, nombres, apellidos, edad} = req.body;
    try{
        const usuarioEditado = await Usuario.editarUsuario(id, correo, username, password, foto, nombres, apellidos, edad);
        res.status(200).json({ message: 'Usuario editado correctamente', usuario: usuarioEditado });
    }catch(error){
        console.error('Error al editar usuario:', error);
        res.status(500).json({ message: 'Hubo un error al editar el usuario', error: error.message });
    }

};