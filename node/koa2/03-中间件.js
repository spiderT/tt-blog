const Koa = require('koa');
const app = new Koa();
const convert = require('koa-convert');

app.use(convert(function *(next) {
  const start = Date.now();
  yield next;
  const ms = Date.now() - start;
  console.log(`${this.method} ${this.url} - ${ms}ms`);
}));

app.listen(3000);