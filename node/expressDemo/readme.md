# 1. node+mongoDB

用 Node.js 实现一个微博系统，功能包括路由控制、页面模板、数据库访问、用户、注册、登录、用户会话等内容

## 1.1 安装express

> npm install -g express,安装好了，命令行敲express --help 出现 Command not found：express，应再安装一个包npm install -g express-generator，原因：原因：express3+已经把创建一个APP的功能分离出来为express-generator，没它你创建不了应用程序

## 1.2 建立工程

- 通过以下命令建立网站基本结构:

```js
express -e ejs microblog
```
- 当前目录下出现了子目录 microblog，并且产生了一些文件。

- 按照提示运行

```js
install dependencies:
     $ cd microblog && npm install

   run the app:
     $ DEBUG=microblog:* npm start
```

## 1.3 启动服务器

- 运行 node app.js，看到 Express server listening on port 3000 in development mode。

- 打开浏览器，输入地址 http://localhost:3000 你就可以看到一个简单的 Welcome to Express 页面了。

## 1.4 工程的结构

Express 生成的文件。除了 package.json，它只产生了两个 JavaScript 文件 app.js 和 routes/index.js。模板引擎ejs 也有两个文件 index.ejs 和layout.ejs， 此外还有样式表 style.css。

## 1.5 路由控制

### 1.5.1 工作原理

![express网站的架构](../../images/express网站的架构.png "express网站的架构")

- 这是一个典型的 MVC 架构，浏览器发送请求，由路由控制器接受，根据不同的路径向到不同的控制器。控制器处理用户的具体请求，可能会访问数据库中的对象，即模型部分，控制器还要访问模板引擎，生成视图的 HTML，最后再由控制器返回给浏览器，完成一次请求。

### 1.5.2 创建路由规则

### 1.5.3 路径匹配

### 1.5.4 REST风格的路由规则

- HTTP协议定下了以下8种标准的方法：

  + GET:请求获取指定资源。
  + HEAD:请求指定资源的响应头。
  + POST:向指定资源提交数据。
  + PUT:请求服务器存储一个资源。
  + DELETE:请求服务器删除指定资源。
  + TRACE:回显服务器收到的请求，主要用于测试或诊断。
  + CONNECT:HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
  + OPTIONS:返回服务器支持的HTTP请求方法。
  
![http请求的绑定函数](../../images/http请求的绑定函数.png "http请求的绑定函数")

### 1.5.5 控制权的转移

- Express 支持同一路径绑定多个路由响应函数

```js
app.all('/user/:username', function(req, res) { 
    res.send('all methods captured');
});
app.get('/user/:username', function(req, res) {
  res.send('user: ' + req.params.username);
});
```

- 但当你访问任何被这两条同样的规则匹配到的路由时，会发现请求总是被前一条路由规则捕获获，后面的规则会被忽略。原因是 Express 在处理路由规则时，会优先匹配先定义的路由规则，因此后面相同的规则被屏蔽。

- Express 提供了路由控制权转移的方法，即回调函数的第3个参数next，通过调用 next()，会将路由控制权转移给后面的规则。

```js
app.all('/user/:username', function(req, res, next) { 
    console.log('all methods captured');
    next();
});
app.get('/user/:username', function(req, res) {
      res.send('user: ' + req.params.username);
});
```
## 1.6 模版引擎

- 模板引擎的使用和集成，也就是视图。视图决定了用户最终能看到什么，因此也是最重要部分。

### 1.6.1 什么是模版引擎

- 模版引擎(Template Engine)是一个从页面模板根据一定的规则生成 HTML 的工具。

### 1.6.2 使用模版引擎

- 在 app.js 中通过以下两个语句设置了模板引擎和页面模板的位置

```js
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
```

- res.render 的功能是调用模板引擎，并将其产生的页面直接返回给客户端。它接受两个参数，第一个是模板的名称，即views 目录下的模板文件 ，不包含文件的扩展名，第二个参数是传递给模板的数据，用于模板翻译。

```js
res.render('index', { title: 'Express' });
```
- ejs 的标 系统非常简 ，它只有以下3种标签。
  + <% code %>:JavaScript 代码。
  + <%= code %>:显示替换过 HTML 特殊字符的内容。
  + <%- code %>:显示原始 HTML 内容。 
  
- 我们可以用它们实现页面模板系统能实现的任何内容。

### 1.6.3 页面布局

- Express 还自动套用了 layout.ejs

```html
<!DOCTYPE html>
    <html>
      <head>
        <title><%= title %></title>
        <link rel='stylesheet' href='/stylesheets/style.css' />
      </head>
      <body>
        <%- body %>
      </body>
</html>
```
- layout.ejs 是一个页面布局模板，它描述了整个页面的框架结构，默认情况下每个单独的页面都继承自这个框架，替换掉 <%- body %> 部分。

- 这个功能并不是强制的，如果想关闭它， 可以在 app.js 的中 app.configure 中添加加以下内容，这样页面布局功能就被关闭了。

```js
app.set('view options', { 
    layout: false
});
```

### 1.6.4 片段视图














