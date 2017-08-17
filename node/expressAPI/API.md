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









