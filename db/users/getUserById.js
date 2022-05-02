const { generateError } = require('../helpers');
const { getConnection } = require('./db');

//FUNCION QUE DEVULVE LA INFORMACIÓN DE UN USUARIO POR SU ID
const getUserById = async (id) => {
  console.log('entramos a la función que devuelve info del usuario por su ID');
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM users WHERE id=?
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No hay ningun usuario con ese id', 404);
    }

    return result[0];
  } finally {
    if (connection)
      connection.release();
  }
};

module.exports = {
    getUserById,
  };