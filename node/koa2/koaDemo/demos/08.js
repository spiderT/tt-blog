const Koa = require('Koa');
const route = require('koa-route');
const app = new Koa();

const redirect = ctx => {
    ctx.response.redirect('/');
    ctx.response.body = '<a href="/">index page</a>'

}

const main = ctx => {
    ctx.response.body = 'hello world';
}

app.use(route.get('/',main))
app.use(route.get('/redirect', redirect));

app.use(main);
app.listen(3000)
