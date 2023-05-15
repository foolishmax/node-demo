const Koa = require('koa');
const app = new Koa();

app.use((ctx) => {
  console.log(ctx.header);
  ctx.body = ctx.header; // 服务端返回内容
});

app.listen(3003, () => {
  console.log('http://127.0.0.1:3003');
});
