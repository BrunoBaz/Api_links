const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../../helpers');
const { getUserByEmail } = require('../../db/users/getUserByEmail');

//FUNCION PARA CONTROLAR LOGIN
const loginController = async (req, res, next) => {
  console.log('pasamos por el controlador para el login');
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError('debes enviar un email y una contraseña', 400);
    }

    ///recojo los datos de la base de datosdel usuario con ese email
    const user = await getUserByEmail(email);

    ///compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError('La contraseña no coincide', 401);
    }
    ///creo el playload del token
    const payload = { id: user.id };

    ///firmo el token
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '30d',
    });

    ///envio el token
    res.send({
      status: 'ok',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

//EXPORTAR FUNCIONES
module.exports = {
  loginController,
};
