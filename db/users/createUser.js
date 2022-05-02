//FUNCION PARA CREAR USUARIO EN LA BASE DE DATOS Y DEVUELVE ID

const { generateError } = require('../../helpers');
const { getConnection } = require('../db');
const bcrypt = require('bcrypt');
const createUser = async (email, password, userName, nombre) => {
  let connection;
  try {
    connection = await getConnection();
    //Comprobar que no exista otro usuario con ese email
    const [user] = await connection.query(
      `SELECT id FROM users WHERE email=?`,
      [email]
    );
    if (user.length > 0) {
      throw generateError(
        'Ya existe un usuario en la base de datos con ese email',
        409 //Conflict
      );
    }

    const [userNameResult] = await connection.query(
      `
    SELECT userName FROM users WHERE userName =?`,
      [userName]
    );
    if (userNameResult.length > 0) {
      throw generateError(
        'Ya existe un usuario en la base de datos con ese nombre de usuario'
      );
    }
    //Encriptar la password
    const passwordHash = await bcrypt.hash(password, 8);

    //Crear el usuario
    const [newuser] = await connection.query(
      `INSERT INTO users (email, password, userName, nombre) VALUES(?,?,?,?)`,
      [email, passwordHash, userName, nombre]
    );
    //Devolver el id
    return newuser.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  createUser,
};
