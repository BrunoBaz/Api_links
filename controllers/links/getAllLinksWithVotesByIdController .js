const { getAllVotedPostById } = require('../../db/links/getAllVotedPostById');

const getAllLinksWithVotesByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const links = await getAllVotedPostById(id);
    res.send({
      status: 'ok',
      data: links,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllLinksWithVotesByIdController };
