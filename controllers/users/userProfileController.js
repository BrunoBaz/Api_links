const { createPathIfNotExists } = require('../../helpers');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const { userProfile } = require('../../db/users/userProfile');
const { getUserById } = require('../../db/users/getUserById');
const { getUserByUserName } = require('../../db/users/getUserByUserName');
const { getUserByEmail } = require('../../db/users/getUserByEmail');

const userProfileController = async (req, res, next) => {
  try {
    const { userName, nombre, email, biografia, telefono } = req.body;
    const user = await getUserById(req.userId);
    let imageFileName;

    if (req.files && req.files.imagen) {
      //Creo path directorio uploads
      const uploadsDir = path.resolve(__dirname, '../../avatar');
      await createPathIfNotExists(uploadsDir);
      //creo el directorio si no existe
      //Procesar la imagen
      const image = sharp(req.files.imagen.data);
      image.resize(1000);
      //Guardarla en el disco con un nombre
      imageFileName = `${nanoid()}.jpg`;
      await image.toFile(path.join(uploadsDir, imageFileName));
    }
    await getUserByUserName(userName);
    await getUserByEmail(email);
    const data = await userProfile(
      userName ? userName : user.userName,
      nombre ? nombre : user.nombre,
      email ? email : user.email,
      imageFileName ? imageFileName : user.imagen,
      biografia ? biografia : user.biografia,
      telefono ? telefono : user.telefono,

      req.userId
    );

    res.send({
      status: 'ok',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

//EXPORTAR FUNCIONES
module.exports = {
  userProfileController,
};
