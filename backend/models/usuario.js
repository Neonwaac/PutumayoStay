const db = require('../db/db');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const axios = require("axios")
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
    static async addFotoUsuario(id, username, foto) {
        try {
            const uniqueName = await Usuario.downloadAndSaveImage(id, username, foto);
            const photoPath = "http://localhost:8077/uploads/images/"+uniqueName;
            const query = `UPDATE usuarios SET foto = ? WHERE id = ?`;
            const [result] = await db.promise().execute(query, [photoPath, id]);
            return { id, foto: photoPath };
        } catch (error) {
            throw new Error(`Error al agregar foto: ${error.message}`);
        }
    }
    static async downloadAndSaveImage(id, username, imageUrl) {
        try {
            const response = await axios({
                url: imageUrl,
                responseType: "arraybuffer", 
            });
    
            const uniqueName = "usuarios"+id+username+".jpg";
            const imagePath = path.join(__dirname, "../uploads/images/", uniqueName);
    
            fs.writeFileSync(imagePath, response.data); 
    
            return uniqueName; 
        } catch (error) {
            throw new Error(`Error al descargar y guardar la imagen: ${error.message}`);
        }
    }
    static async googleLogin(username, correo, password, foto) {
        try {
            // Verificar si la cuenta ya existe con Google
            const existGoogleAccount = await Usuario.googleLoginExistAccount(username, correo);
            
            // Verificar si la cuenta ya existe pero fue creada manualmente
            const existAccount = await Usuario.loginExistAccount(correo);
            // EN CASO DE QUE EXISTA LA CUENTA NORMAL Y NO LA DE GOOGLE NO SE PUEDE CREAR UNA NUEVA
            if (existAccount && !existGoogleAccount) {
                throw new Error("Este correo ya fue registrado directamente en PutumayoStay");
            }
            // EN CASO DE QUE EXISTA UN CORRREO IGUAL Y SU NOMBRE COINCIDA CON EL DE GOOGLE SE INICIA SESION
            if (existAccount && existGoogleAccount) {
                const { usuario, token } = await Usuario.iniciarSesion(username, password);
                if (foto) {
                    await Usuario.addFotoUsuario(usuario.id, username, foto);
                }
                return { usuario, token };
                
            }
            // SI NO EXISTE NINGUNA CUENTA SE CREA UNA NUEVA
            if (!existGoogleAccount && !existAccount) {
                const createdUser = await Usuario.crearUsuario(correo, username, password);
                const userId = createdUser.id;
                if (foto) {
                    await Usuario.addFotoUsuario(userId, username, foto);
                }
                const { usuario, token } = await Usuario.iniciarSesion(username, password);
                return { usuario, token };
            }
        } catch (error) {
            throw new Error(`Error en googleLogin: ${error.message}`);
        }
    }
    
    static async googleLoginExistAccount(username, correo) {
        try {
            const query = `SELECT * FROM usuarios WHERE username = ? AND correo = ?`;
            const [rows] = await db.promise().execute(query, [username, correo]);
            return rows.length > 0;
        } catch (error) {
            throw new Error(`Error al verificar si la cuenta de Google ya se registró anteriormente: ${error.message}`);
        }
    }
    static async loginExistAccount(correo){
        try{
            const query = `SELECT * FROM usuarios WHERE  correo = ?; `
            const [rows] = await db.promise().execute(query, [correo]);
            return rows.length > 0;
        }catch(error){
            throw new Error(`Error al verificar si la cuenta ya existe: ${error.message}`);
        }
    }
    static async obtenerUsuarioPorId(id) {
        try {
            const query = `SELECT * FROM usuarios WHERE id = ?`;
            const [rows] = await db.promise().execute(query, [id]);
            if (rows.length === 0) {
                throw new Error("Usuario no encontrado");
            }
            return rows[0];    
        } catch (error) {
            throw new Error(`Error al obtener usuario por ID: ${error.message}`);
        }
    }
}
module.exports = Usuario;