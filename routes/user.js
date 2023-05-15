var express = require('express');
var router = express.Router();
const userController = require('../controller/user');
const validator = require('../middleware/validator/user');
const { verifyToken } = require('../utils/jwt');
const multer = require('multer');

const upload = multer({ dest: 'public/' });

router
  .post('/register', validator.register, userController.register)
  .post('/login', validator.login, userController.login)
  .get('/list', verifyToken, userController.list)
  .post('/avatar', verifyToken, upload.single('avatar'), userController.avatar)
  .put('/', verifyToken, validator.update, userController.update);

module.exports = router;
