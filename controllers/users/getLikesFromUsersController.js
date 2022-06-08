const { getLikesFromUsers } = require('../../db/users/getLikesFromUsers');

//FUNCION PARA CONTROLAR USUARIO
const getLikesFromUsersController = async (req, res, next) => {
  console.log('pasamos por el controlador para mostrar un usuario');

  try {
    const { id } = req.params;
    const result = await getLikesFromUsers(id);
    res.send({
      status: 'ok',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLikesFromUsersController,
};
