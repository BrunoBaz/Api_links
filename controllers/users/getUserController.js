const { getUserById } = require('../../db/users/getUserById');

//FUNCION PARA CONTROLAR USUARIO
const getUserController = async (req, res, next) => {
  console.log('pasamos por el controlador para mostrar un usuario');
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserController,
};
