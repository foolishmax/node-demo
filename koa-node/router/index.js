const Router = require('@koa/router');
const router = new Router({ prefix: '/api/v1' });
const user = require('../controller/user');
const { verifyToken } = require('../util/jwt');

const {
  registerValidate,
  loginValidate,
} = require('../middleware/userValidate');

router.get('/user/getUser', verifyToken(), user.getUser);
router.post('/user/register', registerValidate, user.register);
router.post('/user/login', loginValidate, user.login);

module.exports = router;
