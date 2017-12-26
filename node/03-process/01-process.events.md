# node

## 3. process

- process 对象是一个 global （全局变量），提供有关信息，控制当前 Node.js 进程。作为一个对象，它对于 Node.js 应用程序始终是可用的，故无需使用 require()。

### 3.1. Process Events

- process 对象是EventEmitter的实例  

#### 3.1.1. Event: 'beforeExit'

- 当Node.js的事件循环数组已经为空，并且没有额外的工作被添加进来，事件'beforeExit'会被触发。 正常情况下，如果没有额外的工作被添加到事件循环数组，Node.js进程会结束。但是如果'beforeExit'事件绑定的监听器的回调函数中，含有一个可以进行异步调用的操作，那么Node.js进程会继续运行。

- process.exitCode 作为唯一的参数值传递给'beforeExit'事件监听器的回调函数。

#### 3.1.2. Event: 'disconnect'

- 如果Node.js进程是由IPC channel的方式创建的(see the Child Process and Cluster documentation)，当IPC channel关闭时，会触发'disconnect'事件。

#### 3.1.3. Event: 'exit'

- 两种情况下'exit'事件会被触发：
  
    + 显式调用process.exit()方法，使得Node.js进程即将结束；
    + Node.js事件循环数组中不再有额外的工作，使得Node.js进程即将结束。
    
- 在上述两种情况下，没有任何方法可以阻止事件循环的结束,一旦所有与'exit'事件绑定的监听器执行完成，Node.js的进程会终止。
    
- 'exit'事件监听器的回调函数，只有一个入参，这个参数的值可以是process.exitCode的属性值，或者是调用process.exit()方法时传入的exitCode值。   

> Examples

```js
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```
- 'exit'事件监听器的回调函数，只允许包含同步操作。所有监听器的回调函数被调用后，任何在事件循环数组中排队的工作都会被强制丢弃，然后Nodje.js进程会立即结束。 例如在下例中，timeout操作永远不会被执行(因为不是同步操作)。

```js
process.on('exit', (code) => {
  setTimeout(() => {
    console.log('This will not run');
  }, 0);
});
```

#### 3.1.4. Event: 'message'

- 如果Node.js进程是由IPC channel的方式创建的(see the Child Process， and Cluster documentation)，当子进程收到父进程的的消息时(消息通过childprocess.send()发送）， 会触发'message'事件。

- 'message'事件监听器的回调函数中被传递的参数如下：

 	+ message <Object> 解析的JSON对象，或primitive值。
	+ sendHandle <Handle object> 一个net.Socket 或 net.Server对象，或undefined。


#### 3.1.5. Event: 'rejectionHandled'

- 如果有Promise被rejected，并且此Promise在Nodje.js事件循环的下次轮询及之后期间，被绑定了一个错误处理器[例如使用promise.catch()][])， 会触发'rejectionHandled'事件。

- 此事件监听器的回调函数使用Rejected的Promise引用，作为唯一入参。

- Promise对象应该已经在'unhandledRejection'事件触发时被处理，但是在被处理过程中获得了一个rejection处理器。

- 对于Promise chain，没有概念表明在 Promise chain的哪个地方，所有的rejections总是会被处理。 由于本来就是异步的，一个Promise rejection可以在将来的某个时间点被处理-可能要远远晚于'unhandledRejection'事件被触发及处理的时间。

- 另一种表述的方式就是，与使用同步代码时会出现不断增长的未处理异常列表不同，使用Promises时，未处理异常列表可能会出现增长然后收缩的情况。

- 在同步代码情况下，当未处理异常列表增长时，会触发'uncaughtException'事件。

- 在异步代码情况下，当未处理异常列表增长时，会触发'uncaughtException'事件，当未处理列表收缩时，会触发'rejectionHandled'事件。


> Examples

```js
const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
  unhandledRejections.set(p, reason);
});
process.on('rejectionHandled', (p) => {
  unhandledRejections.delete(p);
});

```















