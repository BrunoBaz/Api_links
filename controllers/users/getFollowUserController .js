const { followUser } = require('../../db/users/followUser');
const getFollowUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sigo = await followUser(id);

    res.send({
      status: 'ok',
      data: sigo,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getFollowUserController };
