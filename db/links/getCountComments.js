const { getConnection } = require('../db');

const getCountComments = async () => {
  let connection;
  try {
    //Añadir con número de likes
    connection = await getConnection();
    const [result] = await connection.query(
      ` SELECT COUNT(c.post_id) AS comments, l.id FROM comments c LEFT JOIN links l ON l.id=c.post_id GROUP BY l.id ORDER BY l.id DESC `
    );
    console.log(result);
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getCountComments };
