const Koa = require('koa');
const app = new Koa();
// 洋葱模型
app.use((ctx, next) => {
  console.log('one-1');
  next();
  console.log('one-2');
  // 执行next，才会执行下面的use
});

app.use((ctx) => {
  console.log('two-1');
  console.log('two-2');
});

app.listen(3003, () => {
  console.log('http://127.0.0.1:3003');
});
