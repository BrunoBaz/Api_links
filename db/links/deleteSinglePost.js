const { getConnection } = require('../db');

const deleteSinglePost = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(`DELETE FROM links WHERE id=?`, [
      id,
    ]);
    console.log(result);

    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { deleteSinglePost };
