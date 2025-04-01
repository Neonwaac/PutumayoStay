const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const passport = require("../config/passportConfig");
const fs = require('fs');
//USUARIO NORMAL
router.post('/usuarios', usuarioController.crearUsuario);
router.post('/usuarios/:id/foto', upload.single('foto'), usuarioController.addFotoUsuario);
router.post('/usuarios/login', usuarioController.iniciarSesion)
router.post('/verificar-token', usuarioController.verificarToken);
router.get('/usuarios', usuarioController.obtenerUsuarios);
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);
//USUARIO GOOGLE
router.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email", "openid"],  prompt: "select_account"}));
router.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "/login"}), usuarioController.googleLogin);

module.exports = router;