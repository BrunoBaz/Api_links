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
const {
  getAllLinksWithVotesByIdController,
} = require('./controllers/links/getAllLinksWithVotesByIdController ');
const {
  createCommentController,
} = require('./controllers/links/createCommentController');
const {
  getCommentsByIdController,
} = require('./controllers/links/getCommentsByIdController');

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
const {
  getFollowerUserController,
} = require('./controllers/users/getFollowerUserController');
const {
  getFollowUserController,
} = require('./controllers/users/getFollowUserController ');
const {
  createFollowerUserController,
} = require('./controllers/users/createFollowerUserController');
const {
  getLikesFromUsersController,
} = require('./controllers/users/getLikesFromUsersController');

const cors = require('cors');
const { authUser } = require('./middlewares/auth');
const { getAllUserController } = require('./controllers/users/getAllUsers');
const {
  getCountCommentsController,
} = require('./controllers/links/getCountCommentsController');
const app = express();
const PORT = process.env.PORT || 4000;

//APPS
app.use(cors());
app.use(expressFileUpload());
app.use(express.json());
app.use(morgan('dev'));
//APPS STATICAS
app.use('/avatar', express.static('./avatar'));

//RUTAS DE USERS
app.post('user', newUserController);
app.get('user/:id', getUserController);
app.get('users', getAllUserController);
app.get('user/:id/votes', getLikesFromUsersController);
app.get('user/:id/follower', getFollowerUserController);
app.get('user/:id/follow', getFollowUserController);
app.get('user/', authUser, getMyUserController);
app.post('login', loginController);
app.put('user/:id', authUser, userProfileController);
app.post('user/:id/follow', authUser, createFollowerUserController);

//RUTAS DE LINKS
app.get('/', (req, res) => {
  res.send('Estoy funcionando');
});
app.post('link', authUser, newLinkController); //Crear un nuevo post
app.get('link', getAllLinksController); //Seleccionar todos los posts
app.get('link/votes', getAllLinksWithVotesController); //Seleccionar todos los posts con votos
app.get('link/comments', getCountCommentsController); //Seleccionar todos los posts con votos
app.get('link/votes/:id', getAllLinksWithVotesByIdController); //Seleccionar todos los posts con votos
app.get('link/:id', getSinglePostController); //Seleccionar post específico
app.post('link/:id/comments', authUser, createCommentController); //Seleccionar post específico
app.get('link/:id/comments', getCommentsByIdController); //Seleccionar post específico
app.post('link/:id/votes', authUser, voteLinkController); //Añadir un voto a un post especifico
app.delete('link/:id', authUser, deleteLinkController); //Eliminar un post

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
console.log(process.env.JAWSDB);

app.listen(PORT, () => {
  console.log(`Servidor en ${PORT}`);
});
