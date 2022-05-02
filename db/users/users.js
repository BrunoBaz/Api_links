//REQUERIMIENTOS
///conecta con el generador de errores
const { generateError } = require('../helpers');
///conectar con la base de datos
const { getConnection } = require('./db');
///conecta con el modulo de bcrypt
const bcrypt = require('bcrypt');