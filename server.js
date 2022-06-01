//REQUERIMIENTOS
require('dotenv').config();
const express = require('express');
const expressFileUpload = require('express-fileupload');
const morgan = require('morgan');
//Controladores links
const {
  voteLinkController,
} = require('./controllers/links/voteLinkController');
const { newLinkController } = require('./controllers/links/newLinkController');
const {
  getAllLinksController,
} = require('./controllers/links/getAllLinksController');
const {
  deleteLinkController,
} = require('./controllers/links/deleteLinkController');
const {
  getSinglePostController,
} = require('./controllers/links/getSinglePostController');
const {
  getAllLinksWithVotesController,
} = require('./controllers/links/getAllLinksWithVotesController');

//Controladores usuarios
const { getUserController } = require('./controllers/users/getUserController');
const {
  getMyUserController,
} = require('./controllers/users/getMyUserController');
const { loginController } = require('./controllers/users/loginController');
const { newUserController } = require('./controllers/users/newUserController');
const {
  userProfileController,
} = require('./controllers/users/userProfileController');

const cors = require('cors');
const { authUser } = require('./middlewares/auth');
const app = express();

//APPS
app.use(cors());
app.use(expressFileUpload());
app.use(express.json());
app.use(morgan('dev'));
//APPS STATICAS
app.use('/avatar', express.static('./avatar'));

//RUTAS DE USERS
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.get('/user/', authUser, getMyUserController);
app.post('/login', loginController);
app.put('/user/:id', authUser, userProfileController);

//RUTAS DE LINKS
app.post('/link', authUser, newLinkController); //Crear un nuevo post
app.get('/link', getAllLinksController); //Seleccionar todos los posts
app.get('/link/votes', getAllLinksWithVotesController); //Seleccionar todos los posts con votos
app.get('/link/:id', getSinglePostController); //Seleccionar post específico
app.delete('/link/:id', authUser, deleteLinkController); //Eliminar un post
app.post('/link/:id/votes', authUser, voteLinkController); //Añadir un voto a un post especifico

//Middleware de error 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});
//Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//LANZAMOS
app.listen(4000, () => {
  console.log(`Servidor en localhost:4000`);
});
