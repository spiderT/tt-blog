# webworker-learn

- 参考资料：[阮一峰博客](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)，[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Worker)

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

## 1. 使用注意点

Web Worker 有以下几个使用注意点。

1. 同源限制

分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

2. DOM 限制

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。

3. 通信联系

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

4. 脚本限制

Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

5. 文件限制

Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

## 2. 基本用法

```text
Constructors
var myWorker = new Worker(aURL, options);

Properties
myWorker.onerror：指定 error 事件的监听函数。
myWorker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
myWorker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
myWorker.postMessage()：向 Worker 线程发送消息。
myWorker.terminate()：立即终止 Worker 线程。

```

### 2.1. 主线程

主线程采用new命令，调用Worker()构造函数，新建一个 Worker 线程。

```js
var worker = new Worker('work.js');
```

然后，主线程调用worker.postMessage()方法，向 Worker 发消息。

```js
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']});
```

主线程通过worker.onmessage指定监听函数，接收子线程发回来的消息。

```js
worker.onmessage = function (event) {
  console.log('Received message ' + event.data);
  doSomething();
}

function doSomething() {
  // 执行任务
  worker.postMessage('Work done!');
}
```

Worker 完成任务以后，主线程就可以把它关掉。

```js
worker.terminate();
```

### 2.2. Worker 线程

Worker 线程内部需要有一个监听函数，监听message事件。self代表子线程自身，即子线程的全局对象。

```js
self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data);
}, false);
```

除了使用self.addEventListener()指定监听函数，也可以使用self.onmessage指定。监听函数的参数是一个事件对象，它的data属性包含主线程发来的数据。self.postMessage()方法用来向主线程发送消息。

根据主线程发来的数据，Worker 线程可以调用不同的方法

```js
self.addEventListener('message', function (e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
```

Worker 线程有一些自己的全局属性和方法。

```text
self.name： Worker 的名字。该属性只读，由构造函数指定。
self.onmessage：指定message事件的监听函数。
self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
self.close()：关闭 Worker 线程。
self.postMessage()：向产生这个 Worker 线程发送消息。
self.importScripts()：加载 JS 脚本。
```

### 2.3. Worker 加载脚本
Worker 内部如果要加载其他脚本，有一个专门的方法importScripts()。

```js
importScripts('script1.js');
importScripts('script1.js', 'script2.js');
```

### 2.4. 错误处理

主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的error事件。

```js
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```

### 2.5. 关闭 Worker

```js
// 主线程
worker.terminate();

// Worker 线程
self.close();
```

## 3. 数据通信

主线程与 Worker 之间的通信内容，可以是文本，也可以是对象(对象需要先json.stringfy)。需要注意的是，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。

主线程与 Worker 之间也可以交换二进制数据，比如 File、Blob、ArrayBuffer 等类型，也可以在线程之间发送。

```js
// 主线程
var uInt8Array = new Uint8Array(new ArrayBuffer(10));
for (var i = 0; i < uInt8Array.length; ++i) {
  uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
}
worker.postMessage(uInt8Array);

// Worker 线程
self.onmessage = function (e) {
  var uInt8Array = e.data;
  postMessage('Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString());
  postMessage('Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength);
};
```

## 4. 同页面的 Web Worker
通常情况下，Worker 载入的是一个单独的 JavaScript 脚本文件，但是也可以载入与主线程在同一个网页的代码。

<!DOCTYPE html>
  <body>
    <script id="worker" type="app/worker">
      addEventListener('message', function () {
        postMessage('some message');
      }, false);
    </script>
  </body>
</html>
上面是一段嵌入网页的脚本，注意必须指定<script>标签的type属性是一个浏览器不认识的值，上例是app/worker。

然后，读取这一段嵌入页面的脚本，用 Worker 来处理。

```js
var blob = new Blob([document.querySelector('#worker').textContent]);
var url = window.URL.createObjectURL(blob);
var worker = new Worker(url);

worker.onmessage = function (e) {
  // e.data === 'some message'
};
```

上面代码中，先将嵌入网页的脚本代码，转成一个二进制对象，然后为这个二进制对象生成 URL，再让 Worker 加载这个 URL。这样就做到了，主线程和 Worker 的代码都在同一个网页上面。


## 5. 应用场景

对于轮询场景，可以放在 Worker 里面。只要数据有更新，就postMessage给主线程更新。可以结合indexedDB使用，实际工作中，刚用这个方法技改了一个项目。

```js
// 伪代码
var pollingWorker = createWorker(function (e) {
  var cache;

  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/xxx').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('update');

```


## 6. [SharedWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker)

构造函数  SharedWorker()  创建一个执行指定url脚本的共享的web进程。  

SharedWorker实质在于share，不同的线程可以共享一个线程，他们的数据也是共享的。可以被多个window共同使用，但必须保证这些标签页都是同源的(相同的协议，主机和端口号)  

通过SharedWorker() 方法来创建一个共享进程对象。  

```js
var myWorker = new SharedWorker("worker.js");
```

然后两个脚本都通过 MessagePort 对象来访问worker，这个对象用SharedWorker.port 属性获得。如果已经用addEventListener监听了onmessage事件，则可以使用start() 方法手动启动端口：  

```js
myWorker.port.start();
```

启动端口时，两个脚本都会向worker发送消息， 然后使用port.postMessage()和port.onmessage处理从worker发送而来的消息:

```js
first.onchange = function() {
    myWorker.port.postMessage([first.value,second.value]);
    console.log('Message posted to worker');
  }

  second.onchange = function() {
    myWorker.port.postMessage([first.value,second.value]);
    console.log('Message posted to worker');
  }

  myWorker.port.onmessage = function(e) {
    result1.textContent = e.data;
    console.log('Message received from worker');
  }

```

在worker中我们使用SharedWorkerGlobalScope.onconnect 处理程序连接到上面讨论的相同端口。可以在connect event的ports属性中获取到与该worker相关联的端口 — 然后我们使用MessagePort start() 方法来启动端口，然后 onmessage 处理程序处理来自主线程的消息。

```js
onconnect = function(e) {
    var port = e.ports[0];

    port.addEventListener('message', function(e) {
      var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
      port.postMessage(workerResult);
    });

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}
```

**注意**  
在chrome的多user模式，或者隐身模式下，SharedWorker数据是不能共享的
