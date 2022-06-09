const { getConnection } = require('../db');

const createComment = async (id, userId, comentario) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      INSERT INTO comments (post_id,user_id, comentario) VALUES (?,?,?)`,
      [id, userId, comentario]
    );
    return result.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { createComment };
