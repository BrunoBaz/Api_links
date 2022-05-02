const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const getAllPost = async () => {
  let connection;
  try {
    //Añadir con número de likes
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM links ORDER BY created_at DESC`
    );
    if (result[0] === undefined) {
      throw generateError(`No existe ningún post`, 404);
    }
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getAllPost };
