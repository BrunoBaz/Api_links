const { followerUser } = require('../../db/users/followerUser');

const getFollowerUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seguidores = await followerUser(id);

    res.send({
      status: 'ok',
      data: seguidores,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getFollowerUserController };
