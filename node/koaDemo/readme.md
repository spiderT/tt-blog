# 1. koa

next generation web framework for node.js

[koa官方文档](http://koajs.com/)
[阮一峰koa框架教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)

## 1.1 基本用法

### 1.1.1 架设 HTTP 服务

- 用 Koa 架设一个 HTTP 服务。

```js
const Koa = require('koa');
const app = new Koa();

app.listen(3000)
```

- 打开浏览器，访问 http://127.0.0.1:3000 。你会看到页面显示"Not Found"，表示没有发现任何内容。这是因为我们并没有告诉 Koa 应该显示什么内容。


### 1.1.2 Context 对象

- Koa 提供一个 Context 对象，表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）。通过加工这个对象，就可以控制返回给用户的内容。

```js
const Koa = require('koa');
const app = new Koa();

const main = ctx=>{
    ctx.response.body='Hello World';
}

app.use(main);
app.listen(3000);
```
- 访问 http://127.0.0.1:3000 ，现在就可以看到"Hello World"了。

- main函数用来设置ctx.response.body。然后，使用app.use方法加载main函数。

- ctx.response代表 HTTP Response。同样地，ctx.request代表 HTTP Request。

### 1.1.3 HTTP Response 的类型

- Koa 默认的返回类型是text/plain，如果想返回其他类型的内容，可以先用ctx.request.accepts判断一下，客户端希望接受什么数据（根据 HTTP Request 的Accept字段），然后使用ctx.response.type指定返回类型。

```js
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
   if(ctx.request.accepts('xml')){
       ctx.response.type='xml';
       ctx.response.body='<data>hello world</data>'
   }else if(ctx.request.accepts('json')){
       ctx.response.type='json';
       ctx.response.body={data:'hello world'}
   }else if(ctx.request.accepts('html')){
       ctx.response.type='html';
       ctx.response.body='<p>hello world</p>'
   }else{
       ctx.response.type='text';
       ctx.response.body='hello world'
   }
};

app.use(main);
app.listen(3000);
```

- 访问 http://127.0.0.1:3000 ，现在看到的就是一个 XML 文档了。

### 1.1.4 网页模板

- 实际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户。

```js
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

const main = ctx =>{
    ctx.response.type='html';
    ctx.response.body = fs.createReadStream('./template.html');

}

app.use(main);
app.listen(3000);
```

## 1.2 路由

### 1.2.1 原生路由

- 通过ctx.request.path可以获取用户请求的路径。

```js
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
```

### 1.2.2 koa-route 模块

- 原生路由用起来不太方便，我们可以使用封装好的koa-route模块.

```js
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
```

### 1.2.3 静态资源

- 如果网站提供静态资源（图片、字体、样式表、脚本......），为它们一个个写路由就很麻烦，也没必要。koa-static模块封装了这部分的请求。

```js
const Koa = require('Koa');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname));

app.use(main);
app.listen(3000)

```

### 1.2.4 重定向

- 有些场合，服务器需要重定向（redirect）访问请求。比如，用户登陆以后，将他重定向到登陆前的页面。ctx.response.redirect()方法可以发出一个302跳转，将用户导向另一个路由。

```js
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

```

## 1.3 中间件

### 1.3.1 Logger 功能

- Logger （打印日志）功能

```js
const Koa = require('Koa');
const app = new Koa();

const main = ctx => {
    console.log(`${Date.now()}${ctx.request.method}${ctx.request.url}`);
    ctx.response.body = 'hello world';
}

app.use(main);
app.listen(3000);
```

### 1.3.2 中间件的概念

- logger函数就叫做"中间件"（middleware），因为它处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件。

- 每个中间件默认接受两个参数，第一个参数是 Context 对象，第二个参数是next函数。只要调用next函数，就可以把执行权转交给下一个中间件。

```js
const Koa = require('Koa');
const app = new Koa();

const logger = (ctx,next) => {
    console.log(`${Date.now()}${ctx.request.method}${ctx.request.url}`);
    next();
};

const main = ctx => {
    ctx.response.body = 'hello world';
};

app.use(logger);
app.use(main);
app.listen(3000);
```

### 1.3.3 中间件栈

- 多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。

    + 最外层的中间件首先执行。
    + 调用next函数，把执行权交给下一个中间件。
    + ...
    + 最内层的中间件最后执行。
    + 执行结束后，把执行权交回上一层的中间件。
    + ...
    + 最外层的中间件收回执行权之后，执行next函数后面的代码。

```js
const Koa = require('Koa');
const app = new Koa();

const one = (ctx,next) => {
    console.log('>> one');
    next();
    console.log('<< one');
}

const two = (ctx,next) => {
    console.log('>> two');
    next();
    console.log('<< two');
}

const three = (ctx,next) => {
    console.log('>> three');
    next();
    console.log('<< three');
}

app.use(one)
app.use(two)
app.use(three)

app.listen(3000)
/*>> one
 >> two
 >> three
 << three
 << two
 << one*/

```
- 如果中间件内部没有调用next函数，那么执行权就不会传递下去.

### 1.3.4 异步中间件

- 异步操作（比如读取数据库），中间件就必须写成 async 函数。

```js
const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();

const main = async function (ctx,next) {
    ctx.response.type = 'html';
    ctx.response.body = await fs.readFile('./template.html','utf8')
}

app.use(main)
app.listen(3000)
```

### 1.3.5 中间件的合成

- koa-compose模块可以将多个中间件合成为一个。

```js
const compose = require('koa-compose')
const Koa = require('koa')
const app = new Koa();

const logger = (ctx,next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next();
}

const main = ctx => {
    ctx.response.body = 'Hello World';
};

const middlewares = compose([logger, main]);
app.use(middlewares);
app.listen(3000);
```
## 1.4 错误处理

### 1.4.1 500 错误

- HTTP 协定约定这时要返回500状态码。Koa 提供了ctx.throw()方法，用来抛出错误，ctx.throw(500)就是抛出500错误。

```js
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    ctx.throw(500)
}

app.use(main)
app.listen(3000)
```

- 访问 http://127.0.0.1:3000，你会看到一个500错误页"Internal Server Error"。

### 1.4.2 404错误

- 如果将ctx.response.status设置成404，就相当于ctx.throw(404)，返回404错误。

```js
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
   ctx.response.status = 404;
   ctx.response.body = 'Page Not Found';
}

app.use(main)
app.listen(3000)
```

### 1.4.3 处理错误的中间件

- 为了方便处理错误，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。

```js
const Koa = require('koa');
const app = new Koa();

const handler = async(ctx,next) => {
   try{
      await next();
   }catch (err){
      ctx.response.status = err.statusCode || err.status ||500;
      ctx.response.body = {
         message:err.message
      }
   }
}

const main = ctx => {
   ctx.throw(500)
}

app.use(handler)
app.use(main)
app.listen(3000)
```
- 访问 http://127.0.0.1:3000 ，你会看到一个500页，里面有报错提示 {"message":"Internal Server Error"}

### 1.4.4 error 事件的监听

- 运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误。

```js
const Koa = require('koa')
const app = new Koa()

const main = ctx => {
    ctx.throw(500);
}

app.on('error', (err, ctx) => {
    console.error('server error', err)
})

app.use(main)
app.listen(3000)
```
- 访问 http://127.0.0.1:3000 ，你会在命令行窗口看到"server error xxx"。

### 1.4.5 释放 error 事件

- 如果错误被try...catch捕获，就不会触发error事件。这时，必须调用ctx.app.emit()，手动释放error事件，才能让监听函数生效。

```js
const Koa = require('koa');
const app = new Koa();

const handler = async(ctx,next) => {
    try{
        await next()
    }catch (err){
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.type = 'html';
        ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
        ctx.app.emit('error', err, ctx);
    }
}

const main = ctx => {
    ctx.throw(500);
}

app.on('err',err => {
    console.log('logging error ', err.message);
    console.log(err);
})

app.use(handler);
app.use(main);
app.listen(3000);
```

- 上面代码中，main函数抛出错误，被handler函数捕获。catch代码块里面使用ctx.app.emit()手动释放error事件，才能让监听函数监听到。

## 1.5 Web App 的功能

### 1.5.1 Cookies

- ctx.cookies用来读写 Cookie

```js
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
    const n = Number(ctx.cookies.get('view')||0)+1;
    ctx.cookies.set('view',n)
    ctx.response.body = n +'views'
}

app.use(main)
app.listen(3000)
```

- 访问 http://127.0.0.1:3000 ，你会看到1 views。刷新一次页面，就变成了2 views。再刷新，每次都会计数增加1。

### 1.5.2 表单

- 表单就是 POST 方法发送到服务器的键值对。koa-body模块可以用来从 POST 请求的数据体里面提取键值对.

```js
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const main = async (ctx) => {
    const body = ctx.request.body;
    if (!body.name) ctx.throw(400, '.name required')
    ctx.body = {name: body.name}

}

app.use(koaBody())
app.use(main)
app.listen(3000)
```

- 打开另一个命令行窗口，运行下面的命令。

```js

$ curl -X POST --data "name=Jack" 127.0.0.1:3000
//{"name":"Jack"}

$ curl -X POST --data "name" 127.0.0.1:3000
//name required
```
## 1.5.3 文件上传

- koa-body模块还可以用来处理文件上传

```js
const os = require('os');
const path = require('path');
const koaBody = require('koa-body');
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

const main = async ctx => {
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || 0;

    for(let key in files){
        const file = files[key];
        const filePath = path.join(tmpdir,file.name);
        const render = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        render.pipe(writer);
        filePaths.push(filePath);
    }
    ctx.body = filePaths;
}

app.use(koaBody({multipart:true}))
app.use(main)
app.listen(3000)
```

- 打开另一个命令行窗口，运行下面的命令，上传一个文件。注意，/path/to/file要更换为真实的文件路径。

```js
$ curl --form upload=@/path/to/file http://127.0.0.1:3000
//["/tmp/file"]
```











