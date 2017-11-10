const Koa = require('Koa');
const app = new Koa();
const route = require('koa-route');

const about = ctx=>{
    ctx.response.type='html';
    ctx.response.body='<a href="/">index page</a>'
}

const main =ctx=>{
    ctx.response.body='hello wrold'
}

app.use(route.get('/',main))
app.use(route.get('/about',about))

app.listen(3000);