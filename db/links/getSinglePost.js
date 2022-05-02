const { getConnection } = require('../db');

const getSinglePost = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT links.url, links.titulo, links.descripcion, COUNT(v.post_id) AS votes FROM links, votes v WHERE links.id=v.post_id AND links.id=? GROUP BY links.id`,
      [id]
    );
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getSinglePost };
//      `SELECT e.url, e.titulo, e.descripcion, COUNT(v.post_id) FROM enlaces e, votes v WHERE e.id=?`,
