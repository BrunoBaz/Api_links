// const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const createFollow = async (idUser, idseguido) => {
  let connection;
  try {
    connection = await getConnection();

    const [existingUser] = await connection.query(
      `SELECT id FROM follow WHERE main_user_id= ? AND seguido_id=?`,
      [idUser, idseguido]
    );
    //Guardamos follow en la base de datos
    await connection.query(
      `
      INSERT INTO follow (main_user_id, seguido_id)
      VALUES(?,?)`,
      [idUser, idseguido]
    );

    //Comprobar que no existe un follow anterior del usuario

    //Si existe follow, se hace unfollow
    if (existingUser.length > 0) {
      await connection.query(
        `DELETE FROM follow WHERE main_user_id= ? AND seguido_id=? `,
        [idUser, idseguido]
      );
    }

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { createFollow };
