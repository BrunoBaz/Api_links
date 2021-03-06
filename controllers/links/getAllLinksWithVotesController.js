const { getAllPostWithVotes } = require('../../db/links/getAllVotedPost');

const getAllLinksWithVotesController = async (req, res, next) => {
  try {
    const links = await getAllPostWithVotes();
    res.send({
      status: 'ok',
      data: links,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllLinksWithVotesController };
