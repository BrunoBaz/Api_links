const { getConnection } = require('../db');

const getLikesFromUsers = async (id) => {
  let connection;
  try {
    //Añadir con número de likes
    connection = await getConnection();
    const [result] = await connection.query(
      ` SELECT COUNT(votes.post_id) as likes FROM votes left join links l on l.id=votes.post_id where l.user_id=?`,
      [id]
    );
    return result[0];
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getLikesFromUsers };
