const Router = require('@koa/router');
const router = new Router({
  prefix: '/api/v1', // 添加前缀
});
const { koaBody } = require('koa-body');

// router.get('/user/info', (ctx) => {
//   // http://127.0.0.1:3003/api/v1/user/info?id=2
//   // 获取参数 {id = 2}
//   console.log(ctx.query);
//   ctx.body = 'user info';
// });

router.get('/user/info/:id/:age', (ctx) => {
  // http://127.0.0.1:3003/api/v1/user/info/2/444
  // 获取参数 {id = 2,age=444}
  console.log(ctx.params.id, ctx.params.age);
  ctx.body = 'user info';
});

router.post('/user', koaBody(), (ctx) => {
  // 错误抛出
  ctx.throw(400, 'error message');
  // ctx.throw(500, 'error message');
  console.log(ctx.request.body);
});

module.exports = router;
