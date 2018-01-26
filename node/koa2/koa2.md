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




