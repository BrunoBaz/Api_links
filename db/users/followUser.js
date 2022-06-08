// const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const followUser = async (idseguido) => {
  let connection;
  try {
    connection = await getConnection();

    const [sigo] = await connection.query(
      ` select follow.seguido_id, users.userName from follow left join users ON users.id=follow.seguido_id WHERE follow.main_user_id=?`,
      [idseguido]
    );

    return sigo;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { followUser };
