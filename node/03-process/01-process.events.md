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
    
    


> Syntax

```js
new Agent([options])
```

- options <Object> 代理的配置选项。有以下字段：
    + keepAlive <boolean> 保持 socket 可用即使没有请求，以便它们可被将来的请求使用而无需重新建立一个 TCP 连接。默认为 false。
    + keepAliveMsecs <number> 当使用了 keepAlive 选项时，该选项指定 TCP Keep-Alive 数据包的 初始延迟。 当 keepAlive 选项为 false 或 undefined 时，该选项无效。 默认为 1000。
    + maxSockets <number> 每个主机允许的最大 socket 数量。 默认为 Infinity。
    + maxFreeSockets <number> 在空闲状态下允许打开的最大 socket 数量。 仅当 keepAlive 为 true 时才有效。 默认为 256。

> Examples

```js
const http = require('http')
const options = {}
const keepAliveAgent = new http.Agent({ keepAlive: true })
options.agent = keepAliveAgent

function onResponseCallback() {
    console.log('1')
}
http.request(options, onResponseCallback)
```

#### 2.1.2. agent.createConnection

> Syntax

```js
agent.createConnection(options[, callback])

// options <Object> 包含连接详情的选项。查看 net.createConnection() 了解选项的格式。

// callback <Function> 接收被创建的 socket 的回调函数。

// 返回: <net.Socket>
```

- 创建一个用于 HTTP 请求的 socket 或流。
  
- 默认情况下，该函数类似于 net.createConnection()。 但是如果期望更大的灵活性，自定义的代理可以重写该方法。
  
- socket 或流可以通过以下两种方式获取：从该函数返回，或传入 callback。
  
- callback 有 (err, stream) 参数。

#### 2.1.3. agent.keepSocketAlive

> Syntax

```js
agent.keepSocketAlive(socket)
//socket <net.Socket>
```

- 在 socket 被请求分离的时候调用, 可能被代理持续使用. 默认行为:

```js
socket.setKeepAlive(true, this.keepAliveMsecs)
socket.unref()
return true
```

- 这个方法可以被一个特定的 Agent 子类重写. 如果这个方法返回假值, socket 会被销毁而不是 在下一次请求时持续使用.


#### 2.1.4. agent.reuseSocket

> Syntax

```js
agent.reuseSocket(socket, request)
//socket <net.Socket>
//request <http.ClientRequest>
```

- 由于 keep-alive 选项被保持持久化, 在 socket 附加到 request 时调用. 默认行为是:

```js
socket.ref()
```

- 这个方法可以被一个特定的 Agent 子类重写.

#### 2.1.5. agent.destroy

- 销毁当前正被代理使用的任何 socket。
  
- 通常不需要这么做。 但是如果使用的代理启用了 keepAlive，则当确定它不再被使用时，最好显式地关闭代理。 否则，在服务器终止它们之前，socket 可能还会长时间保持打开。


#### 2.1.6. agent.freeSockets

- 返回一个对象，包含当前正在等待被启用了 keepAlive 的代理使用的 socket 数组。 不要修改该属性。

#### 2.1.7. agent.getName

- 为请求选项的集合获取一个唯一的名称，用来判断一个连接是否可以被复用。 对于 HTTP 代理，返回 host:port:localAddress 或 host:port:localAddress:family。 对于 HTTPS 代理，名称会包含 CA、证书、密码、以及其他 HTTPS/TLS 特有的用于判断 socket 复用性的选项。

> 

```js
agent.getName(options)

//options <Object> 为名称生成程序提供信息的选项。
//host <string> 请求发送至的服务器的域名或 IP 地址。
//port <number> 远程服务器的端口。
//localAddress <string> 当发送请求时，为网络连接绑定的本地接口。
//返回: <string>
```

#### 2.1.8. agent.maxFreeSockets

- 默认为 256。 对于已启用 keepAlive 的代理，该属性可设置要保留的空闲 socket 的最大数量。

#### 2.1.9. agent.maxSockets

- 默认为不限制。 该属性可设置代理为每个来源打开的并发 socket 的最大数量。 来源是 agent.getName() 的返回值。

#### 2.1.10. agent.requests

- 返回一个对象，包含还未被分配到 socket 的请求队列。 不要修改。

#### 2.1.11. agent.sockets

- 返回一个对象，包含当前正被代理使用的 socket 数组。 不要修改。