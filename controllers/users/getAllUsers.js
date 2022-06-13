const { getAllUsers } = require('../../db/users/getAllUsers');

//FUNCION PARA CONTROLAR USUARIO
const getAllUserController = async (req, res, next) => {
  console.log('pasamos por el controlador para mostrar un usuario');

  try {
    const user = await getAllUsers(req.userId);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUserController,
};
