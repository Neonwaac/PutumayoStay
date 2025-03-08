const db = require('../db/db');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const saltRounds = 10;
class Usuario {
    constructor(correo, username, password){
        this.username = username;
        this.correo = correo;
        this.password = password;
    }
    static async iniciarSesion(username, password) {
        const query = "SELECT * FROM usuarios WHERE username = ?";
        try {
            const [dbResponse] = await db.promise().execute(query, [username]);
    
            if (dbResponse.length === 0) {
                throw new Error("Usuario no encontrado");
            }
    
            const dbUser = dbResponse[0];
            const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    
            if (!isPasswordValid) {
                throw new Error("Contraseña incorrecta");
            }
            const token = this.generarToken(dbUser.id, dbUser.username, dbUser.rol);
            const tokenQuery = "UPDATE usuarios SET token = ? WHERE id = ?";
            await db.promise().execute(tokenQuery, [token, dbUser.id]);
            delete dbUser.password;
    
            return { usuario: dbUser, token };
        } catch (error) {
            throw error;
        }
    }
    static generarToken(id, username, rol) {
        return jwt.sign(
            { id, username, rol },
            process.env.JWT_SECRET || "secret_provisional",
            { expiresIn: "1h" }
        );
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

    static async crearUsuario(correo, username, password){
        try{
            const query = `INSERT INTO usuarios (correo, username, password) VALUES (?, ?, ?)`;
            const salt = await bcrypt.genSalt(10);
            const passwordEncriptada = await bcrypt.hash(password, salt);
            const [result] = await db.promise().execute(query, [correo, username, passwordEncriptada]);
            return { id: result.insertId, correo, username };
        }catch (error) {
            throw new Error(`Error al insertar usuario: ${error.message}`);
        }
    }
    static async addFotoUsuario(id, foto) {
        try {
            const uniqueName = await Usuario.saveImage(foto);
            const photoPath = "http://localhost:8077/uploads/images/"+uniqueName;
            const query = `UPDATE usuarios SET foto = ? WHERE id = ?`;
            const [result] = await db.promise().execute(query, [photoPath, id]);
            return { id, foto: photoPath };
        } catch (error) {
            throw new Error(`Error al agregar foto: ${error.message}`);
        }
    }
    static async saveImage(foto) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newPath = path.join("./uploads/images/", uniqueName+foto.originalname);
        fs.renameSync(foto.path, newPath);
        return uniqueName+foto.originalname;
    }
}
module.exports = Usuario;