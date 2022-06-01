const { getConnection } = require('../db');

const getAllPostWithVotes = async () => {
  let connection;
  try {
    //Añadir con número de likes
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT l.id, l.url, l.titulo, l.descripcion, l.created_at , l.user_id, COUNT(v.post_id) AS votes FROM links l LEFT JOIN votes v ON l.id=v.post_id GROUP BY l.id ORDER BY l.id DESC `
    );
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getAllPostWithVotes };
