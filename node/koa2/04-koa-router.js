const Koa = require('koa')
const fs = require('fs')
const Router = require('koa-router')

const app = new Koa()

const router = new Router()

router.get('/', async ctx => {
  let html = `
  <ul>
      <li><a href="/hello">/hello</a></li>
      <li><a href="/404">/404</a></li>
    </ul>
  `
  ctx.body = html
}).get('/404',async ctx =>{
  ctx.body = `<p>404 notFound</p>`
}).get('/hello',async ctx =>{
  ctx.body = `<p>hello world</p>`
})

app.use(router.routes())

app.listen(3000,()=>{
  console.log('app is start at port 3000')
})





