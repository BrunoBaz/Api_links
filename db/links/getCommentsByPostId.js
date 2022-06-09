const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const getCommentsByPostId = async (idPost) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT c.post_id, c.user_id, c.comentario, u.userName FROM comments c LEFT JOIN users u ON u.id=c.user_id WHERE c.post_id=?; `,
      [idPost]
    );

    if (result[0] === undefined) {
      throw generateError(`No existe el post con id:${idPost}`, 404);
    }
    console.log('result', result[0]);
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getCommentsByPostId };
