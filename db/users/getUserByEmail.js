const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

//FUNCION QUE DEVULVE LA INFORMACIÓN DE UN USUARIO POR SU EMAIL
const getUserByEmail = async (email) => {
  console.log(
    'entramos a la función que devuelve info del usuario por su email'
  );
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM users WHERE email = ?
      `,
      [email]
    );

    /*  if (result.length === 0) {
      throw generateError('No hay ningun usuario con ese email', 404);
    } else  */ if (result.length > 1) {
      throw generateError('El correo electrónico ya está en uso');
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getUserByEmail,
};
