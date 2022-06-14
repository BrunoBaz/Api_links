const { getCountComments } = require('../../db/links/getCountComments');

const getCountCommentsController = async (req, res, next) => {
  try {
    const result = await getCountComments();
    res.send({
      status: 'ok',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getCountCommentsController };
