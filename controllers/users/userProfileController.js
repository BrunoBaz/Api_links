const { createPathIfNotExists } = require('../../helpers');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { userProfile } = require('../../db/users/userProfile');

const userProfileController = async (req, res, next) => {
  try {
    const { userName, nombre, email, biografia, telefono } = req.body;
    let imageFileName;
    //console.log(req.files);
    if (req.files && req.files.imagen) {
      //Creo path directorio uploads
      const uploadsDir = path.resolve(__dirname, '../../img/avatars/uploads');
      await createPathIfNotExists(uploadsDir);
      //creo el directorio si no existe
      //Procesar la imagen
      const image = sharp(req.files.imagen.data);
      image.resize(1000);
      //Guardarla en el disco con un nombre
      imageFileName = `${nanoid()}.jpg`;
      await image.toFile(path.join(uploadsDir, imageFileName));
    }
    await userProfile(
      userName,
      nombre,
      email,
      imageFileName,
      biografia,
      telefono,

      req.userId
    );
    res.send({
      status: 'ok',
      message: `Usuario con id:${req.userId} ha modificado su cuenta.`,
    });
  } catch (error) {
    next(error);
  }
};

//EXPORTAR FUNCIONES
module.exports = {
  userProfileController,
};
