# webpack HMR

版本  

```text
 "webpack": "^5.4.0",
  "webpack-cli": "^3.3.12",
  "webpack-dev-server": "^3.11.0"
```

Hot Module Replacement是 Webpack 提供的一个非常有用的功能，它允许在 JavaScript 运行时更新各种模块，而无需完全刷新.

## 1. HMR 的工作原理图解

![HMR 模块](images/webpack1.png)

## 2. Webpack-dev-server: 监控代码变化，重新编译打包

启动 Webpack-dev-server 启动本地服务器并进入 Webpack 的 watch 模式，然后初始化 Webpack-dev-middleware ，在 Webpack-dev-middleware 中通过调用 startWatch() 方法对文件系统进行 watch：  

1. 启动本地服务器  
webpack-dev-server\bin\webpack-dev-server.js Line 106  

```js
server = new Server(compiler, options, log);
```

2. 初始化 Webpack-dev-middleware  
webpack-dev-server\lib\Server.js Line 207

```js
// middleware for serving webpack bundle
this.middleware = webpackDevMiddleware(
  this.compiler,
  Object.assign({}, this.options, { logLevel: this.log.options.level })
);
```

3. 开始 watch 文件系统  
webpack-dev-middleware\index.js Line 40  

```js
// start watching
  if (!options.lazy) {
    context.watching = compiler.watch(options.watchOptions, (err) => {
      if (err) {
        context.log.error(err.stack || err);
        if (err.details) {
          context.log.error(err.details);
        }
      }
    });
  } else {
    if (typeof options.filename === 'string') {
      const filename = options.filename
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') // eslint-disable-line no-useless-escape
        .replace(/\\\[[a-z]+\\\]/gi, '.+');

      options.filename = new RegExp(`^[/]{0,1}${filename}$`);
    }

    context.state = true;
  }  
```