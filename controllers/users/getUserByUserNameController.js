/* const { getAllUsers } = require('../../db/users/getAllUsers');
const { getUserByUserName } = require('../../db/users/getUserByUserName');
//FUNCION PARA CONTROLAR USUARIO
const getUserByUserNameController = async (req, res, next) => {
  console.log('pasamos por el controlador para mostrar un usuario');
  try {
    const users = await getAllUsers();
    const allUserNames = users.map((user) => user.userName);
    const userByUserName =
      allUserNames && (await getUserByUserName(allUserNames));
    if (userByUserName) {
      throw new Error('ya existe ese nombre de usuario');
    }
    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserByUserNameController,
};
 */
