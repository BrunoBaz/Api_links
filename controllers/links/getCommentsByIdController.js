const { getCommentsByPostId } = require('../../db/links/getCommentsByPostId');

const getCommentsByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await getCommentsByPostId(id);
    res.send({
      status: 'ok',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getCommentsByIdController };
