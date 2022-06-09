const { getConnection } = require('../db');

const getAllPostWithVotes = async () => {
  let connection;
  try {
    //Añadir con número de likes
    connection = await getConnection();
    const [result] = await connection.query(
      ` SELECT l.id, l.url, l.titulo, l.descripcion, l.created_at , l.user_id, u.userName, COUNT(v.post_id) AS votes, COUNT(c.comentario) AS comentarios FROM links l LEFT JOIN votes v ON l.id=v.post_id INNER JOIN users u ON l.user_id=u.id LEFT JOIN comments c ON  l.id=c.post_id GROUP BY l.id ORDER BY l.id DESC `
    );
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getAllPostWithVotes };
