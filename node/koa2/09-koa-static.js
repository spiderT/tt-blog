const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()


const staticPath = './08-原生koa2实现静态资源服务器/static'

app.use(static(path.join(__dirname, staticPath)))


app.use(async ctx => {
  ctx.body = 'hello world'
})


app.listen(3000, () => {
  console.log('app is starting at port 3000');
})

