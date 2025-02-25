const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
router.post('/usuarios', usuarioController.crearUsuario);
router.post('/usuarios/:id/foto', upload.single('foto'), usuarioController.addFotoUsuario);
router.post('/usuarios/login', usuarioController.iniciarSesion)
router.post('/verificar-token', usuarioController.verificarToken);
router.get('/usuarios', usuarioController.obtenerUsuarios);
module.exports = router;