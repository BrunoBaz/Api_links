const { followUser } = require('../../db/users/followUser');
const followUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = await followUser(userId, id);

    res.send({
      status: 'ok',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { followUserController };
