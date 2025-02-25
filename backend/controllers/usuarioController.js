const Usuario = require('../models/usuario');
//MANEJO DE IMAGENES
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Hubo un error al obtener los usuarios', error: error.message });
    }
}
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
exports.addFotoUsuario = async (req, res) => {
    const { id } = req.params;
    const foto = req.file; // Accede correctamente al archivo subido

    if (!foto) {
        return res.status(400).json({ message: 'No se subió ninguna foto' });
    }

    try {
        const fotoGuardada = await Usuario.addFotoUsuario(id, foto);
        res.status(201).json({ message: 'Foto guardada correctamente', foto: fotoGuardada });
    } catch (error) {
        console.error('Error al guardar foto:', error);
        res.status(500).json({ message: 'Hubo un error al guardar la foto', error: error.message });
    }
};
exports.iniciarSesion = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({ message: 'Rellena todos los campos' });
    }
    try{
        const token = await Usuario.iniciarSesion(username, password);
        res.status(201).json({ message: 'Inicio de sesión exitoso', token: token })
    }catch(error){
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message})
    }
}
exports.verificarToken = (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ mensaje: "No autorizado: Token no encontrado", valido: false });
        }
        const tokenDecoded = Usuario.verificarToken(token);
        res.json({ valido: true, mensaje: "Token válido", usuario: tokenDecoded });
    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido o expirado", valido: false });
    }
};