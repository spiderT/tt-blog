const Koa = require('koa');
const app = new Koa();
const http = require('http');

http.createServer(app.callback()).listen(3000)