const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const getSinglePost = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT links.id, links.url, links.titulo, links.descripcion, links.user_id, links.created_at, u.userName, COUNT(v.post_id) AS votes FROM links LEFT JOIN votes v ON links.id=v.post_id  INNER JOIN users u ON links.user_id=u.id AND links.id=? GROUP BY links.id ORDER BY links.id DESC`,
      [id]
    );
    console.log(result);
    if (result[0] === undefined) {
      throw generateError(`No existe el post con id:${id}`, 404);
    }
    console.log('result', result[0]);
    return result[0];
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getSinglePost };
