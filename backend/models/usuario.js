const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const axios = require("axios");
const saltRounds = 10;
class Usuario {
  constructor(correo, username, password) {
    this.username = username;
    this.correo = correo;
    this.password = password;
  }
  static async iniciarSesion(
    username,
    password,
    fromGoogle = false,
    correo = null
  ) {
    let query;
    let queryParam;
    if (fromGoogle) {
      if (!correo) {
        throw new Error(
          "Correo no proporcionado para iniciar sesión con Google"
        );
      }
      query = `SELECT * FROM usuarios WHERE correo = ?`;
      queryParam = correo;
    } else {
      query = `SELECT * FROM usuarios WHERE username = ?`;
      queryParam = username;
    }
    try {
      const [dbResponse] = await db.promise().execute(query, [queryParam]);

      if (dbResponse.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      const dbUser = dbResponse[0];
      if (!fromGoogle) {
        const isPasswordValid = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta");
        }
      }
      const token = this.generarToken(dbUser.id, dbUser.username, dbUser.rol);
      const tokenQuery = "UPDATE usuarios SET token = ? WHERE id = ?";
      await db.promise().execute(tokenQuery, [token, dbUser.id]);

      delete dbUser.password;

      return { token };
    } catch (error) {
      throw error;
    }
  }
  static generarToken(id, username, rol) {
    return jwt.sign(
      { id, username, rol },
      process.env.PUTUMAYOSTAY_JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
  static async obtenerUsuarios() {
    try {
      const query = `SELECT * FROM usuarios`;
      const [rows] = await db.promise().execute(query);
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }
  static async crearUsuario(correo, username, password) {
    try {
      const query = `INSERT INTO usuarios (correo, username, password) VALUES (?, ?, ?)`;
      const salt = await bcrypt.genSalt(10);
      const passwordEncriptada = await bcrypt.hash(password, salt);
      const [result] = await db
        .promise()
        .execute(query, [correo, username, passwordEncriptada]);
      return { id: result.insertId, correo, username };
    } catch (error) {
      throw new Error(`Error al insertar usuario: ${error.message}`);
    }
  }
  static async addFotoUsuario(id, username, foto, fromGoogle = false) {
    try {
      let uniqueName;
      if (fromGoogle) {
         uniqueName = await Usuario.downloadAndSaveImage(
          id,
          username,
          foto
        );
      } else {
        uniqueName = await Usuario.SaveImage(id, username, foto);
      }
      const photoPath = "https://localhost:8077/uploads/images/" + uniqueName;
      const query = `UPDATE usuarios SET foto = ? WHERE id = ?`;
      const [result] = await db.promise().execute(query, [photoPath, id]);
      return { id, foto: photoPath };
    } catch (error) {
      throw new Error(`Error al agregar foto: ${error.message}`);
    }
  }
static async SaveImage(id, username, foto) {
  try {
    const imageDir = path.join(__dirname, "../uploads/images/");
    const ext = path.extname(foto.originalname);
    const uniqueName = "usuarios" + id + username + ext;
    const imagePath = path.join(imageDir, uniqueName);

    // Eliminar cualquier archivo anterior con el mismo prefijo
    const files = fs.readdirSync(imageDir);
    const prefix = `usuarios${id}`;
    files.forEach(file => {
      if (file.startsWith(prefix)) {
        fs.unlinkSync(path.join(imageDir, file));
      }
    });

    // Guardar la nueva imagen
    fs.writeFileSync(imagePath, foto.buffer);

    return uniqueName;
  } catch (error) {
    throw new Error(`Error al guardar la imagen: ${error.message}`);
  }
}

  static async downloadAndSaveImage(id, username, imageUrl) {
    try {
      const response = await axios({
        url: imageUrl,
        responseType: "arraybuffer",
      });

      const uniqueName = "usuarios" + id + username + ".jpg";
      const imagePath = path.join(__dirname, "../uploads/images/", uniqueName);

      fs.writeFileSync(imagePath, response.data);

      return uniqueName;
    } catch (error) {
      throw new Error(
        `Error al descargar y guardar la imagen: ${error.message}`
      );
    }
  }
  static async googleLogin(username, correo, password, foto) {
    try {
      const existGoogleAccount = await Usuario.googleLoginExistAccount(correo);

      if (existGoogleAccount) {
        const { token } = await Usuario.iniciarSesion(
          username,
          password,
          true,
          correo
        );
        return { token };
      }
      if (!existGoogleAccount) {
        const createdUser = await Usuario.crearUsuario(
          correo,
          username,
          password
        );
        const userId = createdUser.id;
        if (foto) {
          await Usuario.addFotoUsuario(userId, username, foto, true);
        }
        const { token } = await Usuario.iniciarSesion(username, password);
        return { token };
      }
    } catch (error) {
      throw new Error(`Error en googleLogin: ${error.message}`);
    }
  }
  static async googleLoginExistAccount(correo) {
    try {
      const query = `SELECT * FROM usuarios WHERE correo = ?; `;
      const [rows] = await db.promise().execute(query, [correo]);
      return rows.length > 0;
    } catch (error) {
      throw new Error(
        `Error al verificar si la cuenta ya existe: ${error.message}`
      );
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
  static async obtenerUsuarioPorToken(token) {
    const query = `SELECT * FROM usuarios WHERE token = ?`;
    try {
      const [rows] = await db.promise().execute(query, [token]);
      if (rows.length === 0) {
        throw new Error("Usuario no encontrado");
      }
      return rows[0];
    } catch (error) {
      throw new Error(`Error al obtener usuario por token: ${error.message}`);
    }
  }
  static async cerrarSesion(id) {
    try {
      const query = `UPDATE usuarios SET token = NULL WHERE id = ?`;
      const [result] = await db.promise().execute(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado, model");
      }
      return true;
    } catch (error) {
      throw new Error(`Error al cerrar sesión: ${error.message}`);
    }
  }
  static async mostRooms() {
    try {
      const query = `SELECT 
            e.username AS "nombre",
            e.foto AS "foto",
              (
                SELECT COUNT(*) 
                FROM habitaciones AS h 
                WHERE h.id_empresa = e.id
              ) AS "habitaciones",
              'Nuestra empresa con más habitaciones registradas' AS observacion
            FROM usuarios AS e
            WHERE (
              SELECT COUNT(*) 
              FROM habitaciones AS h 
              WHERE h.id_empresa = e.id
            ) = (
              SELECT MAX(conteo)
              FROM (
                SELECT COUNT(*) AS conteo
                FROM habitaciones
                GROUP BY id_empresa
              ) AS sub
            );`;
      const [rows] = await db.promise().execute(query);
      if (rows.length === 0) {
        throw new Error("No se encontraron habitaciones");
      }
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener habitaciones: ${error.message}`);
    }
  }
  static async mostPayments() {
    try {
      const query = `SELECT 
      u.id,
      u.username,
      u.foto,
      (
        SELECT COUNT(*) 
        FROM historial_pagos AS hp 
        WHERE hp.id_usuario = u.id
      ) AS "pagos_realizados",
      'Este usuario es quien más pagos ha realizado' AS observacion
    FROM usuarios u
    WHERE (
      SELECT COUNT(*) 
      FROM historial_pagos AS hp 
      WHERE hp.id_usuario = u.id
    ) = (
      SELECT MAX(total)
      FROM (
        SELECT COUNT(*) AS total
        FROM historial_pagos
        GROUP BY id_usuario
      ) AS sub
    );`;
      const [rows] = await db.promise().execute(query);
      if (rows.length === 0) {
        throw new Error("No se encontraron pagos");
      }
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener pagos: ${error.message}`);
    }
  }
  static async mostBookings() {
    try {
      const query = `SELECT 
      u.id,
      u.username,
      u.foto,
      (
        SELECT COUNT(*) 
        FROM reservas AS r 
        WHERE r.id_usuario = u.id
      ) AS total_reservas,
      'Este usuario tiene el mayor número de reservas' AS observacion
    FROM usuarios u
    WHERE (
      SELECT COUNT(*) 
      FROM reservas AS r 
      WHERE r.id_usuario = u.id
    ) = (
      SELECT MAX(total)
      FROM (
        SELECT COUNT(*) AS total
        FROM reservas
        GROUP BY id_usuario
      ) AS conteo
    );`;
      const [rows] = await db.promise().execute(query);
      if (rows.length === 0) {
        throw new Error("No se encontraron reservas");
      }
      return rows;
    } catch (error) {
      throw new Error(`Error al obtener reservas: ${error.message}`);
    }
  }
  static async updateUsername(id, username) {
    try {
      const query = `UPDATE usuarios SET username = ? WHERE id = ?`;
      const [result] = await db.promise().execute(query, [username, id]);
      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado");
      }
      return { id, username };
    } catch (error) {
      throw new Error(`Error al actualizar el nombre de usuario: ${error.message}`);
    }
  }
  static async updateDatosUsuario(id, nombre, apellido, correo, telefono) {
    try {
      const query = `UPDATE usuarios SET nombres = ?, apellidos = ?, correo = ?, telefono = ? WHERE id = ?`;
      const [result] = await db.promise().execute(query, [
        nombre,
        apellido,
        correo,
        telefono,
        id,
      ]);
      if (result.affectedRows === 0) {
        throw new Error("Usuario no encontrado");
      }
      return { id, nombre, apellido, correo, telefono };
    } catch (error) {
      throw new Error(`Error al actualizar los datos del usuario: ${error.message}`);
    }
  }
}
module.exports = Usuario;
