const { createFollow } = require('../../db/users/createFollow');
const createFollowerUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    await createFollow(userId, id);

    res.send({
      status: 'ok',
      message: 'Follow creado',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { createFollowerUserController };
