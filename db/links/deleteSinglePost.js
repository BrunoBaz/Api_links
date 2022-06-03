const { getConnection } = require('../db');

const deleteSinglePost = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(`DELETE FROM votes WHERE post_id=?`, [id]);
    await connection.query(`DELETE FROM links WHERE id=?`, [id]);

    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { deleteSinglePost };
