const { votePost } = require('../../db/links/votePost');
const voteLinkController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const result = await votePost(id, userId);

    res.send({
      status: 'ok',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { voteLinkController };
