const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const multer = require('multer');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const passport = require("../config/passportConfig");
const fs = require('fs');
//USUARIO NORMAL
router.post('/usuarios', usuarioController.crearUsuario);
router.get('/usuarios/mostpayments', usuarioController.mostPayments);
router.get('/usuarios/mostbookings', usuarioController.mostBookings);
router.put('/usuarios/:id/username', usuarioController.updateUsername);
router.put('/usuarios/:id/photo', upload.single('foto'), usuarioController.updateFotoUsuario);
router.put('/usuarios/:id/data', usuarioController.updateDatosUsuario);
router.post('/usuarios/login', usuarioController.iniciarSesion)
router.post('/verificar-token', usuarioController.verificarToken);
router.get('/usuarios',apiKeyMiddleware, usuarioController.obtenerUsuarios);
router.get('/empresa/mostrooms', usuarioController.mostRooms);
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);
router.get('/usuarios/cerrar-sesion/:id', usuarioController.cerrarSesion);
router.get('/usuarios/token/:id', usuarioController.obtenerUsuarioPorToken);
//USUARIO GOOGLE
router.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email", "openid"],  prompt: "select_account"}));
router.get("/auth/google/callback", passport.authenticate("google", {failureRedirect: "/login"}), usuarioController.googleLogin);

module.exports = router;