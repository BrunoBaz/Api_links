const { getUserById } = require('../../db/users/getUserById');

//FUNCION PARA CONTROLAR USUARIO
const getMyUserController = async (req, res, next) => {
  console.log('pasamos por el controlador para mostrar un usuario');

  try {
    const user = await getUserById(req.userId);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyUserController,
};
