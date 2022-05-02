//FUNCION PARA CREAR USUARIO EN LA BASE DE DATOS Y DEVUELVE ID
const createUser = async (name, avatar = '', nick_name, email, password) => {
    console.log('entramos a la función que crea un usuario nuevo');
    let connection;
    try {
      connection = await getConnection();
  
      //comprueba que no existe otro usuario con ese email
      const [user_email] = await connection.query(
        `
          SELECT id FROM users WHERE email = ?
          `,
        [email]
      );
      ////si no devuelve error 409
      if (user_email.length > 0) {
        throw generateError(`Ya existe una cuenta con ${email}`, 409);
      }
  
      //comprueba que no existe otro usuario con ese nickname
      const [user_name] = await connection.query(
        `
        SELECT id FROM users WHERE nick_name = ?
         `,
        [nick_name]
      );
      ///si no devuelve error 409
      if (user_name.length > 0) {
        throw generateError(`Lo sentimos pero ${nick_name} ya esta en uso`, 409);
      }
  
      //encripta la password
      const passwordHash = await bcrypt.hash(password, 8);
  
      //si no detecta nombre en el registro pone el mismo el el nickname
      if (name.length <= 0) {
        name = `${nick_name}`;
      }
  
      //crea usuario
      const [newUser] = await connection.query(
        `
      INSERT INTO users (name, avatar, nick_name, email, password) VALUES (?, ?, ?, ?, ?)
          `,
        [name, avatar, nick_name, email, passwordHash]
      );
  
      //devuelve ID
      return newUser.insertId;
    } finally {
      //se carga a la base de datos
      if (connection)
        connection.release();
    }
  };

  module.exports = {
    createUser,
  };