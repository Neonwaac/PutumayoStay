const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');
exports.crearUsuario = async (req, res) => {
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
    const { correo, username, password, foto, nombres, apellidos, edad} = req.body;
    const { id } = req.params;
    
};