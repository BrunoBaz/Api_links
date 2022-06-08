// const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const followerUser = async (idseguido) => {
  let connection;
  try {
    connection = await getConnection();

    const [seguidores] = await connection.query(
      `SELECT f.main_user_id, u.userName, f.seguido_id FROM follow f LEFT JOIN users u ON u.id=f.main_user_id WHERE seguido_id=?`,
      [idseguido]
    );

    return seguidores;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { followerUser };
