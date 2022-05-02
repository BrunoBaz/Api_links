//REQUERIMIENTOS
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
const { loginController } = require('./controllers/users/loginController');
const { newUserController } = require('./controllers/users/newUserController');
const {
  userProfileController,
} = require('./controllers/users/userProfileController');

const { authUser } = require('./middlewares/auth');
const app = express();

//APPS
app.use(expressFileUpload());
app.use(express.json());
app.use(morgan('dev'));

//RUTAS DE USERS
app.post('/user', newUserController); 
app.get('/user/:id', getUserController);
app.post('/login', loginController);
app.put('/user/:id', authUser,userProfileController);

//RUTAS DE LINKS
app.post('/', authUser, newLinkController);
app.get('/', getLinksController);
app.get('/link/:id', getSingleLinkController);
app.post('/link/:id', likesController);
app.delete('/link/:id', authUser, deleteLinkController);

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
app.listen(3000, () => {
  console.log(`Servidor en localhost:3000`);
});
