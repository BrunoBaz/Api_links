// const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const followUser = async (idUser, idFollower) => {
  let connection;
  try {
    connection = await getConnection();

    //Comprobamos que existe el user
    /*   const [user] = await connection.query(
      `
    SELECT id, userName FROM users WHERE id = ?
      `,
      [idUser]
    ); */
    /* const idUserFollow = user.map((e) => e.id); */
    const [existingUser] = await connection.query(
      `SELECT id FROM follow WHERE user_id= ? AND follower_id=?`,
      [idUser, idFollower]
    );
    //Guardamos follow en la base de datos
    await connection.query(
      `
      INSERT INTO follow (user_id, follower_id)
      VALUES(?,?)`,
      [idUser, idFollower]
    );

    //Comprobar que no existe un follow anterior del usuario

    //Si existe follow, se hace unfollow
    if (existingUser.length > 0) {
      await connection.query(
        `DELETE FROM follow WHERE user_id= ? AND follower_id=? `,
        [idUser, idFollower]
      );
    }
    /*  const [result] = await connection.query(
      `    SELECT f.user_id,f.followe.id, u.userName WHERE users u INNER JOIN follow f ON u.id=f.user_id AND u.id=f.follower_id  `
    ); */
    return;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { followUser };
