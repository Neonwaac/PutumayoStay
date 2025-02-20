const db = require('../db/db');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');

class Usuario {
    constructor(correo, username, password){
        this.username = username;
        this.correo = correo;
        this.password = password;
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
    static async subirFoto(id, foto){
        
    }
    static async editarUsuario(id, correo, username, password, foto, nombres, apellidos, edad){
        
    }
}
module.exports = Usuario;