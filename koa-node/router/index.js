const Router = require('@koa/router');
const router = new Router({ prefix: '/api/v1' });
const user = require('../controller/user');

router.get('/user', user.index);

module.exports = router;
