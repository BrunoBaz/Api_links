const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const getSinglePost = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT links.url, links.titulo, links.descripcion, COUNT(v.post_id) AS votes FROM links LEFT JOIN votes v ON links.id=v.post_id AND links.id=? GROUP BY links.id`,
      [id]
    );
    if (result[0] === undefined) {
      throw generateError(`No existe el post con id:${id}`, 404);
    }
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getSinglePost };
