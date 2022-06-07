const { getConnection } = require('../db');
const { getUserById } = require('./getUserById');

const userProfile = async (
  userName,
  nombre,
  email,
  imagen,
  biografia,
  telefono,
  id
) => {
  let connection;
  try {
    connection = await getConnection();
    await connection.query(
      `
    UPDATE users  SET userName=?,nombre = ?, email = ? ,imagen = ?, biografia = ?, telefono = ?
    WHERE id=?`,
      [userName, nombre, email, imagen, biografia, telefono, id]
    );
    const userModified = await getUserById(id);
    return userModified;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { userProfile };
