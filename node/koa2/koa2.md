#  koa2

## 1. api

### 1.1 app

####  1.1.1. app.listen(...)

- 启动一个服务
 
```js
const Koa = require('koa');
const app = new Koa();

app.listen(3000)
```
 
- app.listen 是 http.createServer 的简单包装，它实际上这样运行：

```js
const Koa = require('koa');
const app = new Koa();
const http = require('http');

http.createServer(app.callback()).listen(3000)
```

#### 1.1.2. app.callback()

- 返回一个可被 http.createServer() 接受的程序实例，也可以将这个返回函数挂载在一个 Connect/Express 应用中。
  
#### 1.1.3. app.use(function)

- 将给定的 function 当做中间件加载到应用中

#### 1.1.4 app.keys=

- 设置一个签名 Cookie 的密钥。这些参数会被传递给 KeyGrip 如果你想自己生成一个实例

```js
app.keys = ['im a newer secret', 'i like turtle'];
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
```
>签名密钥只在配置项 signed 参数为真时才会生效：

```js
this.cookies.set('name', 'tobi', { signed: true });
```

#### 1.1.5 async/await 的使用

- koa2 异步读取文件的方法

```js
const Koa = require('koa')
const app = new Koa()
const fs = require('fs')

function render( file ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `${file}`
    fs.readFile(viewUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}


app.use( async ( ctx ) => {
  let html = await render('./file.html')
  ctx.body = html
})

app.listen(3000)
console.log('[demo] start-async is starting at port 3000')
```

### 1.2. Error Handling (错误处理)

- 除非 NODE_ENV 被配置为 "test"，Koa 都将会将所有错误信息输出到 stderr，也可以自定义「错误事件」来监听 Koa app 中发生的错误，比如记录错误日志：

```js
app.on('error', function(err){
  log.error('server error', err);
});
```

- 当任何 req 或者 res 中出现的错误无法被回应到客户端时，Koa 会在第二个参数传入这个错误的上下文：

```js
app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});
```
- 任何错误有可能被回应到客户端，比如当没有新数据写入 socket 时，Koa 会默认返回一个 500 错误，并抛出一个 app 级别的错误到日志处理中间件中。

### 1.3. Context (应用上下文)

- Koa 的上下文封装了 request 与 response 对象至一个对象中,可以在 ctx.request 和 ctx.response 中访问到这些方法。

- 每一个请求都会创建一段上下文。在控制业务逻辑的中间件中，上下文被寄存在 this 对象中：

```js
app.use(function *(){
  this; // 上下文对象
  this.request; // Request 对象
  this.response; // Response 对象
});
```
- 为了使用方便，许多上下文属性和方法都被委托代理到他们的 ctx.request 或 ctx.response，比如访问 ctx.type 和 ctx.length 将被代理到 response 对象，ctx.path 和 ctx.method 将被代理到 request 对象。


### 1.4. Request

- request.header 请求头对象

- request.header= 设置请求头对象

- request.headers  是request.header的别名

- request.headers=  是request.header=的别名

...


## 2. 中间件app.use()

### 2.1 常用的koa中间件

1. 日志模块koa-logger

2. 优化错误信息koa-onerror

    * Koa 有 error 事件，通过该事件可以对错误进行统一对处理，这段代码在如果捕获到错误，页面会打印出 “Internal Server Error” （这是Koa对错误的默认处理）
    
```js
const Koa = require('koa');
const app = Koa();
app.on('error', function(err,ctx){
	console.log(err);
});   
app.listen(3000);
```

    * Koa-onerror可以优化错误信息
```js
const onerror = require('koa-onerror');
onerror(app);
```    

3. 静态文件指定koa-static

```js
const staticServer = require('koa-static');
const path = require('path');
app.use(staticServer(path.join(__dirname,'public')));
```

4. ejs模板的使用koa-ejs

```js
const render = require('koa-ejs');
render(app, {
    root: path.join(__dirname, 'views'),
    layout: '__layout',
    viewExt: 'html',
    cache: false,
    debug: true
});
app.use(function *(){
    yield this.render('index',{layout:false});
});
```

### 2.1 Koa 中间件机制实现原理

通过实现简单的 Koa 框架（剥离除中间件外所有的逻辑）来实现，参见[koa中间件机制详解](https://cnodejs.org/topic/58fd8ec7523b9d0956dad945)
 
- co 函数库是著名程序员 TJ Holowaychuk 于2013年6月发布的一个小工具，用于 Generator 函数的自动执行。

- 需要一个middleware数组，用来存储中间件.

```js
const co = require('co');
 function SimpleKoa(){
    this.middlewares = [];
  }
 SimpleKoa.prototype = {
     //注入个中间件
    use: function(gf){
         this.middlewares.push(gf);
     },
    //执行中间件
     listen: function(){
         this._run();
     },
    _run: function(){
        var ctx = this;
         var middlewares = ctx.middlewares;
         return co(function *(){
            var prev = null;
              var i = middlewares.length;
              //从最后一个中间件到第一个中间件的顺序开始遍历
              while (i--) {
             //实际Koa的ctx应该指向server的上下文，这里做了简化
             //prev 将前面一个中间件传递给当前中间件
                 prev = middlewares[i].call(ctx, prev);
             }
            //执行第一个中间件
             yield prev;
         })();
     }
};
```

## 3. koa-router 

Koa-router支持五种方法

```js
router.get()
router.post()
router.put()
router.del()
router.patch()
```
基本用法

```js
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
```

原生koa2 实现路由

```js
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

function render( page ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}

async function route( url ) {
  let view = '404.html'
  switch ( url ) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
      break
  }
  let html = await render( view )
  return html
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = await route( url )
  ctx.body = html
})

app.listen(3000)
console.log('[demo] route-simple is starting at port 3000')
```

## 4. 请求数据获取

### 4.1. GET

GET请求数据有两个途径

- 是从上下文中直接获取
    + 请求对象ctx.query，返回如 { a:1, b:2 
    + 请求字符串 ctx.querystring，返回如 a=1&b=2

- 是从上下文的request对象中获取
    + 请求对象ctx.request.query，返回如 { a:1, b:2 }
    + 请求字符串 ctx.request.querystring，返回如 a=1&b=2
    

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  let url = ctx.url

  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }

})

app.listen(3000, ()=>{
  console.log(`app is start at port 3000`)
})
```

### 4.2. POST

对于POST请求的处理，koa2没有封装获取参数的方法，需要通过解析上下文context中的原生node.js请求对象req，将POST表单数据解析成query string（例如：a=1&b=2&c=3），再将query string 解析成JSON格式（例如：{"a":"1", "b":"2", "c":"3"}）

```js
const Koa = require('koa')
const app = new Koa()

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')

  for(let [index, queryStr] of queryStrList.entries()){
    let itemLsit  = queryStr.split('=')
    queryData[[itemLsit[0]]] = decodeURIComponent(itemLsit[1])
  }
  return queryData
}


function parsePostData(ctx) {
  return new Promise((resolve, reject) =>{
    try{
      let postdata = ''
      ctx.req.addListener('data',data=>{
        postdata += data
      })

      ctx.req.addListener('end',data =>{
        let parseData = parseQueryStr(postdata)
        resolve (parseData)
      })
    }catch(err){
      reject(err)
    }
  })
}


app.use(async ctx=>{
  if(ctx.url === '/' && ctx.method === 'GET'){
    let html = `
     <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `

    ctx.body = html

  }else if(ctx.url === '/'&& ctx.method === 'POST'){
    let postData = await parsePostData(ctx)
    ctx.body = postData
  }else {
    ctx.body = '<h1>404</h1>'
  }

})

app.listen(3000,()=>{
  console.log('app is starting at port 3000');
})
```


### 4.3. koa-bodyparser中间件

对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中

```js
const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')


app.use(bodyParser())

app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = ctx.request.body
    ctx.body = postData
  }
})

app.listen(3000,()=>{
  console.log('app is starting at port 3000');
})

```

## 5. 实现静态资源服务器

### 5.1 原生koa2实现静态资源服务器

一个http请求访问web服务静态资源，一般响应结果有三种情况

- 访问文本，例如js，css，png，jpg，gif
- 访问静态目录
- 找不到资源，抛出404错误


> 具体demo见 08-原生koa2实现静态资源服务器

### 5.2 koa-static中间件使用

```js
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

```

## 6. cookie/session

### 6.1. cookie

koa提供了从上下文直接读取、写入cookie的方法

- ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
- ctx.cookies.set(name, value, [options]) 在上下文中写入cookie

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  if (ctx.url === '/index') {
    ctx.cookies.set(
      'cid',
      'hello world',
      {
        domain: 'localhost',
        path: '/index',
        maxAge: 10 * 60 * 1000,
        expires: new Date('2017-02-12'),
        httpOnly: false,
        overwrite: false
      }
    )
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello world'
  }
})


app.listen(3000,()=>{
  console.log('app is starting at port 3000');
})
```

### 6.2. session

koa2原生功能只提供了cookie的操作，但是没有提供session操作。session就只用自己实现或者通过第三方中间件实现。在koa2中实现session的方案有一下几种

- 如果session数据量很小，可以直接存在内存中
- 如果session数据量很大，则需要存储介质存放session数据


## 7. 文件上传

### 7.1. busboy模块

busboy 模块是用来解析POST请求，node原生req中的文件流


## 8. 实现jsonp


### 8.1 原生实现jsonp

- JSONP跨域输出的数据是可执行的JavaScript代码
    + ctx输出的类型应该是'text/javascript'
    + ctx输出的内容为可执行的返回数据JavaScript代码字符串
    
- 需要有回调函数名callbackName，前端获取后会通过动态执行JavaScript代码字符，获取里面的数据


```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {

  if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getDate.jsonp') {
    // 获取jsonp的callback
    let callbackName = ctx.query.callback || 'callback'

    let returnData = {
      success: true,
      data: {
        text: 'this is a jsonp api',
        time: new Date().getTime()
      }
    }

    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`

    ctx.type = 'text/javascript'
    ctx.body = jsonpStr

  } else {
    ctx.body = 'hello jsonp'
  }

})

app.listen(3000, () => {
  console.log('app is starting at port 3000');
})
```

### 8.2 koa-jsonp中间件

```js
const Koa = require('koa')
const jsonp = require('koa-jsonp')
const app = new Koa()

app.use(jsonp())


app.use( async ( ctx ) => {

  let returnData = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().getTime(),
    }
  }

  // 直接输出JSON
  ctx.body = returnData
})

app.listen(3000, () => {
  console.log('koa-jsonp is starting at port 3000')
})
```

## 9. 单元测试

- 相关测试框架

    + mocha 模块是测试框架
    + chai 模块是用来进行测试结果断言库，比如一个判断 1 + 1 是否等于 2
    + supertest 模块是http请求测试库，用来请求API接口


