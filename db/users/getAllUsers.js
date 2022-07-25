const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

//FUNCION QUE DEVULVE LA INFORMACIÓN DE UN USUARIO POR SU ID
const getAllUsers = async () => {
  console.log('entramos a la función que devuelve info de todos los usuarios');
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT * FROM users 
      `
    );
    console.log(connection);

    if (result.length === 0) {
      throw generateError('No hay ningun usuario registrado');
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getAllUsers,
};
