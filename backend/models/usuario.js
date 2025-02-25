const db = require('../db/db');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
class Usuario {
    constructor(correo, username, password){
        this.username = username;
        this.correo = correo;
        this.password = password;
    }
    static async obtenerUsuarios(){
        try{
            const query = `SELECT * FROM usuarios`;
            const [rows] = await db.promise().execute(query);
            return rows;
        }catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }
    static async encriptarContraseña(password){
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    static async crearUsuario(correo, username, password){
        try{
            const query = `INSERT INTO usuarios (correo, username, password) VALUES (?, ?, ?)`;
            const passwordEncriptada = await Usuario.encriptarContraseña(password);
            const [result] = await db.promise().execute(query, [correo, username, passwordEncriptada]);
            return { id: result.insertId, correo, username };
        }catch (error) {
            throw new Error(`Error al insertar usuario: ${error.message}`);
        }
    }
    static async addFotoUsuario(id, foto) {
        try {
            const savedPath = await Usuario.saveImage(foto);
            const query = `UPDATE usuarios SET foto = ? WHERE id = ?`;
            const [result] = await db.promise().execute(query, [savedPath, id]);
            return { id, foto: savedPath };
        } catch (error) {
            throw new Error(`Error al agregar foto: ${error.message}`);
        }
    }
    static async saveImage(foto) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newPath = path.join("./uploads/images/", uniqueName+foto.originalname);
        fs.renameSync(foto.path, newPath);
        return newPath;
    }
    static async iniciarSesion(username, password){
        try{
            const query = "SELECT  * FROM usuarios WHERE username = ?"
            const rows =  await db.promise().execute(query, [username]);
            if(rows.length === 0){
                throw new Error('Usuario no encontrado en la base de datos');
            }
            const usuario = rows[0];
            const passwordIsValid = await bcrypt.compare(password, usuario.password);
            if(!passwordIsValid){
                throw new Error('La contraseña no coincide con el usuario');
            }
            const token = jwt.sign({ id: usuario.id, username: usuario.username }, 'secret_provisional', { expiresIn: '1h'});
            const tokenUpdateQuery = "UPDATE usuarios SET token = ? WHERE id = ?";
            await db.promise().execute(tokenUpdateQuery, [token, usuario.id]);
            return { token, usuario: {id: usuario.id, correo: usuario.correo, username: usuario.username} }
        }catch(error){
            throw new Error('Error al iniciar sesión:' +error.message)
        }
    }
    static verificarToken(token) {
        return jwt.verify(token, 'secret_provisional');
    }
}
module.exports = Usuario;