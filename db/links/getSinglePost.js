const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const getSinglePost = async (idPost) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT links.id, links.url, links.titulo, links.descripcion, links.user_id, links.created_at, u.userName, u.imagen ,COUNT(v.post_id) AS votes FROM links LEFT JOIN votes v ON links.id=v.post_id  INNER JOIN users u ON links.user_id=u.id AND links.id=? GROUP BY links.id ORDER BY links.id DESC`,
      [idPost]
    );

    if (result[0] === undefined) {
      throw generateError(`No existe el post con id:${idPost}`, 404);
    }

    return result[0];
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getSinglePost };
