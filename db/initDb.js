//Archivo para crear la base de datos
require('dotenv').config();
const { getConnection } = require('./db');

async function main() {
  let connection;
  try {
    connection = await getConnection();

    console.log('borrando tablas existentes');
    await connection.query(`
      DROP TABLE IF EXISTS comments;
      `);
    await connection.query(`
      DROP TABLE IF EXISTS follow;
      `);
    await connection.query(`
      DROP TABLE IF EXISTS votes;
      `);

    await connection.query(`
      DROP TABLE IF EXISTS links;
      `);

    await connection.query(`
      DROP TABLE IF EXISTS users;
      `);
    console.log('Creando tablas');
    //eliminar direccion
    await connection.query(`
      CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(100) NOT NULL,
          userName VARCHAR(50) NOT NULL,
          nombre VARCHAR(100) NOT NULL,
         imagen VARCHAR(100) DEFAULT "avatar-default.svg",
           biografia TEXT,
          telefono VARCHAR(20),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      `);
    await connection.query(`
      CREATE TABLE links (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          user_id INTEGER NOT NULL,
          url VARCHAR(255)  NOT NULL,
          titulo VARCHAR(100) NOT NULL,
          descripcion VARCHAR(280) NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
      );
      `);

    //eliminar vote_like, no necesario
    await connection.query(`
      CREATE TABLE votes (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          post_id INTEGER NOT NULL,
          post_user_id INTEGER NOT NULL,
          FOREIGN KEY (post_id) REFERENCES links(id),
          FOREIGN KEY (post_user_id) REFERENCES users(id)
      );
      `);
    await connection.query(`
      CREATE TABLE follow (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          user_id INTEGER NOT NULL,
         follower_id INTEGER NOT NULL,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (follower_id) REFERENCES users(id),
          FOREIGN KEY (user_id) REFERENCES users(id)
      );
      `);
    await connection.query(`
      CREATE TABLE comments (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          post_id INTEGER NOT NULL,
         user_id INTEGER NOT NULL,
          comentario TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (post_id) REFERENCES links(id),
          FOREIGN KEY (user_id) REFERENCES users(id)
      );
      `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      connection.release();
      process.exit();
    }
  }
}
main();
