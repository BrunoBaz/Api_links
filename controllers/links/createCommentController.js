const { createComment } = require('../../db/links/createComment');
const createCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comentario } = req.body;
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
