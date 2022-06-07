const { createPost } = require('../../db/links/createPost');
const { validateUrl } = require('../../validators/validateUrl');
const { getSinglePost } = require('../../db/links/getSinglePost');
const newLinkController = async (req, res, next) => {
  try {
    const { url, titulo, descripcion } = req.body;
    const validate = await validateUrl(url);
    const id = await createPost(
      req.userId,
      validate.value,
      titulo,
      descripcion
    );
    const link = await getSinglePost(id);
    console.log(link);
    res.send({
      status: 'ok',
      data: link,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { newLinkController };
