// const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const votePost = async (id, idUser) => {
  let connection;
  try {
    connection = await getConnection();

    //Comprobamos que existe el post
    const [post] = await connection.query(
      `
    SELECT id, url, user_id FROM links WHERE id = ?
      `,
      [id]
    );
    const idPost = post.map((e) => e.id);
    const [existingVote] = await connection.query(
      `SELECT id FROM votes WHERE post_id=? AND post_user_id = ?`,
      [id, idUser]
    );
    //Guardamos voto en la base de datos
    await connection.query(
      `
      INSERT INTO votes (post_id, post_user_id)
      VALUES(?,?)`,
      [id, idUser]
    );

    //Comprobar que no existe un voto anterior del usuario

    //Si existe voto, se elimina del post
    if (existingVote.length > 0) {
      await connection.query(
        `DELETE FROM votes WHERE post_id= ? AND post_user_id=? `,
        [idPost, idUser]
      );
    }
    const [result] = await connection.query(
      ` SELECT l.id, l.url, l.titulo, l.descripcion, l.created_at , l.user_id, u.userName, COUNT(v.post_id) AS votes FROM links l LEFT JOIN votes v ON l.id=v.post_id INNER JOIN users u ON l.user_id=u.id GROUP BY l.id ORDER BY l.id DESC `
    );
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { votePost };
