const Koa = require('koa');
const app = new Koa();
const router = require('./router/index');
const { koaBody } = require('koa-body');

// app.use(async (ctx, next) => {
//   console.log(ctx.path);
//   默认，一般是使用@koa/router
//   if (ctx.path === '/user') {
//   } else if (ctx.path === '/video') {
//   }
// });

app.use(router.routes());
app.use(koaBody());

// 错误监听
app.on('error', (err, ctx) => {
  console.log(err);
  ctx.body = err;
});

app.listen(3003, () => {
  console.log('http://127.0.0.1:3003');
});
