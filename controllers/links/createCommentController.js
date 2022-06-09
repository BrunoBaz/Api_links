const { createComment } = require('../../db/links/createComment');
const createCommentController = async (req, res, next) => {
  try {
    const { comentario } = req.body;
    const { id } = req.params;
    console.log({ comentario });
    await createComment(id, req.userId, comentario);

    res.send({
      status: 'ok',
      message: 'Comentario creado con exito',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { createCommentController };
