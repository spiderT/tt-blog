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




