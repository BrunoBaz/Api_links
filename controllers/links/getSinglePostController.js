const { getSinglePost } = require('../../db/links/getSinglePost');

const getSinglePostController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const links = await getSinglePost(id);
    res.send({
      status: 'ok',
      data: links,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getSinglePostController };
