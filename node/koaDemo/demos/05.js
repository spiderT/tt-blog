const Koa = require('Koa');
const app = new Koa();

const main = ctx=>{
    if(ctx.request.path !== '/'){
        ctx.response.type = 'html';
        ctx.response.body = '<a href="/">index page</a>'
    }else{
        ctx.response.body = 'hello wrold';
    }
}

app.use(main);
app.listen(3000);