# 1. koa2

## 1.1 api

### 1.1.1 app

#### 1.1.1.1. app.listen(...)

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

#### 1.1.1.2. app.callback()

- 返回一个可被 http.createServer() 接受的程序实例，也可以将这个返回函数挂载在一个 Connect/Express 应用中。
  
#### 1.1.1.3. app.use(function)

- 将给定的 function 当做中间件加载到应用中

#### 1.1.1.4 app.keys=

- 设置一个签名 Cookie 的密钥。这些参数会被传递给 KeyGrip 如果你想自己生成一个实例

```js
app.keys = ['im a newer secret', 'i like turtle'];
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
```
>签名密钥只在配置项 signed 参数为真时才会生效：

```js
this.cookies.set('name', 'tobi', { signed: true });
```

### 1.1.2 Error Handling (错误处理)

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

### 1.1.3 Context (应用上下文)

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


### 1.1.4 