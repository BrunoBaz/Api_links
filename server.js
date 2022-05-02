const express = require('express');
const expressFileUpload = require('express-fileupload');
const morgan = require('morgan');

const app = express();

app.use(expressFileUpload());
app.use(express.json());
app.use(morgan('dev'));
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

app.listen(3000, () => {
  console.log(`Servidor en localhost:3000`);
});
