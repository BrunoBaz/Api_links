const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

//FUNCION QUE DEVULVE LA INFORMACIÓN DE UN USUARIO POR SU ID
const getUserByUserName = async (userName) => {
  console.log('entramos a la función que devuelve info del usuario por su ID');
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT exists (SELECT users.userName) FROM users WHERE userName=?
      `,
      [userName]
    );

    if (result.length === 0) {
      throw generateError('No hay ningun usuario con ese id', 404);
    } else if (result.length > 1) {
      throw generateError('El nombre de usuario ya está en uso');
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getUserByUserName,
};
