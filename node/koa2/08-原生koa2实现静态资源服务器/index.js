const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mimes = require('./util/mimes')


const app = new Koa()

const staticPath = './static'

function parseMine(url) {
  let extName = path.extname(url)
  extName = extName ? extName.slice(1) : 'unknown'

  return mimes[extName]

}


app.use(async ctx => {
  let fullStaticPath = path.join(__dirname, staticPath)

  // 获取静态资源内容，有可能是文件内容，目录，或404
  let _content = await content(ctx, fullStaticPath)

  // 解析请求内容的类型
  let _mime = parseMine(ctx.url)

  // 如果有对应的文件类型，就配置上下文的类型
  if (_mime) {
    ctx.type = _mime
  }

  if (_mime && _mime.indexOf('image/') >= 0) {
    // 如果是图片，则用node原生res，输出二进制数据
    ctx.res.writeHead(200)
    ctx.res.write(_content, 'binary')
    ctx.res.end()
  } else {
    ctx.body = _content
  }
})

app.listen(3000, () => {
  console.log('app is starting at port 3000');
})














