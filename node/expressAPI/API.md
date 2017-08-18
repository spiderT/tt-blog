# 1. node

## 1.1 express

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(3000);
```

### 1.2 Application

#### 1.2.1 app.set(name, value)

将设置项 name 的值设为 value 。

```js
const express = require('express');
const app = express();

app.set('title','My site')
console.log(app.get('title'));//My site
```

#### 1.2.2 app.get(name)

获取设置项 name 的值。

```js
app.get('title');
// => undefined

app.set('title', 'My Site');
app.get('title');
// => "My Site"
```

#### 1.2.3 app.enable(name)

将设置项 name 的值设为 true 。

```js
app.enable('trust proxy');
app.get('trust proxy');
// => true
```

#### 1.2.4 app.disable(name)

将设置项 name 的值设为 false 。

```js
app.disable('trust proxy');
app.get('trust proxy');
// => false
```

#### 1.2.5 app.enabled(name)

检查设置项 name 是否已启用。

```js
app.enabled('trust proxy');
// => false

app.enable('trust proxy');
app.enabled('trust proxy');
// => true
```

#### 1.2.6 app.disabled(name)

检查设置项 name 是否已禁用。

```js
app.disabled('trust proxy');
// => true

app.enable('trust proxy');
app.disabled('trust proxy');
// => false
```

#### 1.2.7 app.configure([env], callback)

当 env 和 app.get('env') (也就是 process.env.NODE_ENV) 匹配时, 调用 callback 。保留这个方法是出于历史原因，后面列出的 if 语句的代码其实更加高效、直接。使用 app.set 配合其它一些配置方法后,没有必要再使用这个方法。

```js
// 所有环境
app.configure(function(){
  app.set('title', 'My Application');
})

// 开发环境
app.configure('development', function(){
  app.set('db uri', 'localhost/dev');
})

// 只用于生产环境
app.configure('production', function(){
  app.set('db uri', 'n.n.n.n/prod');
})
```
更高效且直接的代码如下：

```js
// 所有环境
app.set('title', 'My Application');

// 只用于开发环境
if ('development' == app.get('env')) {
  app.set('db uri', 'localhost/dev');
}

// 只用于生产环境
if ('production' == app.get('env')) {
  app.set('db uri', 'n.n.n.n/prod');
}
```

#### 1.2.8 app.use([path], function)

使用中间件 function，可选参数 path 默认是 “/”。

```js
const express = require('express');
const app = express();

app.use((req,res,next) => {
    console.log('lalla', req.method, req.url);
    next();
})

app.use((req,res,next) => {
    res.send('hello world');
})

app.listen(3000)
```

- 使用express.static（）中间件在./public中提供文件的典型用例：

```js
app.use(express.static(__dirname + '/public'));
```

- 下面的内建的可以改变 Express 行为的设置：

 + env 运行时环境，默认为 process.env.NODE_ENV 或者 “development”
 + trust proxy 激活反向代理，默认是未激活状态
 + jsonp callback name 修改 ?callback= 的默认 callback 的名字
 + json replacer JSON 替换时的回调, 默认为 null
 + json spaces JSON 响应被格式化时的空格数量，开发环境下是 2 ，生产环境是 0
 + case sensitive routing 路由的大小写敏感, 默认是关闭状态，”/Foo” 和 “/foo” 被认为是一样的
 + strict routing路由的严格格式, 默认情况下 “/foo” 和 “/foo/” 被路由认为是一样的
 + view cache E模板缓存，在生产环境中是默认开启的
 + view engine 默认的模板引擎
 + views 模板的目录, 默认是 “process.cwd() + ‘/views’”
 
#### 1.2.9 app.engine(ext, callback)

注册模板引擎的 callback 用来处理 ext 扩展名的文件。

- 默认情况下, 根据文件扩展名 require() 加载相应的模板引擎。 比如你想渲染一个 “foo.jade” 文件，Express 会在内部执行下面的代码，然后会缓存 require() ，这样就可以提高后面操作的性能
 
```js
app.engine('jade', require('jade').__express);
``` 

#### 1.2.10 app.param([name], callback)

路由参数的处理逻辑。比如当 :user出现在一个路由路径中，你也许会自动载入加载用户的逻辑，并把它放置到 req.user , 或者校验一下输入的参数是否正确。

```js
//展示了 callback 很像中间件，但是在参数里多加了一个值，这里名为 id 。它会尝试加载用户信息，然后赋值给 req.user, 否则就传递错误 next(err)。
app.param('user', function(req, res, next, id){
  User.find(id, function(err, user){
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});
```

```js
//检查如果第二个参数是一个正则，返回一个很像上面的 “user” 参数例子行为的回调函数。
app.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});
```

这个函数现在可以非常有效的用来校验参数，或者提供正则捕获后的分组：

```js
app.param('id', /^\d+$/);

app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});

app.param('range', /^(\w+)\.\.(\w+)?$/);

app.get('/range/:range', function(req, res){
  var range = req.params.range;
  res.send('from ' + range[1] + ' to ' + range[2]);
});
```

#### 1.2.11 app.VERB(path, [callback...], callback)


#### 1.2.12 app.all(path, [callback...], callback)

```js
app.all('*', requireAuthentication, loadUser);
```

或者

```js
app.all('*', requireAuthentication);
app.all('*', loadUser);
```

”全局“白名单函数。例如限制前缀为 “/api”:

```js
app.all('/api/*', requireAuthentication);
```

#### 1.2.13 app.locals

应用程序本地变量会附加给所有的在这个应用程序内渲染的模板。

```js
const express = require('express');
const app = express();

app.locals.title = 'My App';
app.locals.strftime = require('strftime');

console.log(app.locals);
```
app.locals 对象是一个 JavaScript Function，执行的时候它会把属性合并到它自身，提供了一种简单展示已有对象作为本地变量的方法。

#### 1.2.14 app.render(view, [options], callback)

渲染 view ， 回调函数 callback 用来处理返回的渲染后的字符串。

```js
app.render('email', function(err, html){
  // ...
});
```

#### 1.2.15 app.routes

app.routes 对象存储了所有的被 HTTP 定义路由

#### 1.2.16 app.listen()

在给定的主机和端口上监听请求

```js
var express = require('express');
var app = express();
app.listen(3000);
```

因为 app 不是从 HTTP 或者 HTTPS 继承来的，它只是一个简单的回调函数，你可以以同一份代码同时处理 HTTP 和 HTTPS 版本的服务。

```js
var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
```

### 1.3 Request

#### 1.3.1 req.params

#### 1.3.2 req.query

解析的查询字符串

```js
const express = require('express')
const app = express();


app.get('/user/:id?',(req,res) => {
    console.log(req.query)
    res.end('lalla');
})

app.listen(3000)

//访问http://localhost:3000/user?q=anv
//控制台打印{ q: 'anv' }

```

#### 1.3.3 req.body

被解析的请求体,该功能由bodyParser（）中间件提供

#### 1.3.4 req.files

上传文件

```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const multipart = require('connect-multiparty')//中间件 文件上传
const multipartMiddleware = multipart();

//https://www.npmjs.com/package/connect-multiparty

app.post('/upload',multipartMiddleware,(req,resp)=>{
    console.log(req.body, req.files);
})
```

#### 1.3.5 req.param(name)

当存在时返回参数名称的值

```js
// ?name=tobi
req.param('name')
// => "tobi"
```

#### 1.3.6 req.route

当前匹配的路由包含多个属性，如路由的原始路径字符串，正则表达式生成等

```js
const express = require('express');
const app = express();

app.get('/user/:id?', (req, res) => {
    console.log(req.route)
});

app.listen(3000);
/*Route {
    path: '/user/:id?',
        stack:
    [ Layer {
        handle: [Function],
        name: '<anonymous>',
        params: undefined,
        path: undefined,
        keys: [],
        regexp: /^\/?$/i,
        method: 'get' } ],
        methods: { get: true } }*/
```

#### 1.3.7 req.cookies

需要使用cookieParser（）中间件。它包含用户代理发送的cookie。如果没有发送cookie，则默认为{}。

```js
// Cookie: name=tt
req.cookies.name
// => "tt"
```

#### 1.3.8 req.signedCookies

签名的Cookie留在不同的对象中以显示开发人员的意图;

```js
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
req.signedCookies.user
// => "tobi"
```

#### 1.3.9 req.get(field)

获取不区分大小写的请求头域. “Referrer” 和 “Referer” 字段是可互换的。

```js
req.get('Content-Type');
// => "text/plain"

req.get('content-type');
// => "text/plain"
```

#### 1.3.10 req.accepts(types)

检查给定的类型是否可以接受。

```js
// Accept: text/*, application/json
req.accepts('html');
// => "html"
req.accepts('text/html');
// => "text/html"
req.accepts('json, text');
// => "json"
req.accepts('application/json');
// => "application/json"
```

#### 1.3.11 req.accepted

返回一系列接受的media类型，从最高质量排序到最低。


#### 1.3.12 req.is(type)

检查传入请求是否包含“Content-Type”头域，并且与给定的类型匹配

```js
// With Content-Type: text/html; charset=utf-8
req.is('html');
req.is('text/html');
req.is('text/*');
// => true
```

#### 1.3.13 req.ip

返回远程地址，或启用“信任代理”时 - 上游地址。

```js
req.ip
// => "127.0.0.1"
```

#### 1.3.14 req.ips

当“信任代理”为真时，解析“X-Forwarded-For”ip地址列表并返回一个数组，否则返回一个空数组。


#### 1.3.15 req.path

返回请求URL路径名。

```js
// example.com/users?sort=desc
req.path
// => "/users"
```

#### 1.3.16 req.host

从“主机”头域返回主机名（不含portno）

```js
// Host: "example.com:3000"
req.host
// => "example.com"
```

#### 1.3.17 req.fresh

检查请求是否是最新的 - 也就是上次修改和/或ETag仍然匹配，表示资源是“最新的”。

#### 1.3.18 req.stale

检查请求是否过时 - 还有“Last-Modified”和/或“ETag”不匹配，表示资源为“过时”。

#### 1.3.19 req.xhr

检查请求是否已发出“X-Requested-With”标题字段设置为“XMLHttpRequest”（jQuery等）。

#### 1.3.20 req.protocol

请求时使用TLS返回协议字符串“http”或“https”。

#### 1.3.21 req.secure

检查TLS连接是否建立。

```js
'https' == req.protocol;
```

















