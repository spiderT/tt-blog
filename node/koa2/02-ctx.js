const Koa = require('koa');
const app = new Koa();

app.use(function *() {
    this;
    this.request;
    this.response;
})