# node

## 2. http

- Node.js 中的 HTTP 接口被设计成支持协议的许多特性。 比如，大块编码的消息。 这些接口不缓冲完整的请求或响应，用户能够以流的形式处理数据。

- HTTP 消息头由一个对象表示，例如：

```js
{ 'content-length': '123',
  'content-type': 'text/plain',
  'connection': 'keep-alive',
  'host': 'mysite.com',
  'accept': '*/*' }
```
- 键名是小写的，键值不能修改。

- 为了支持各种可能的 HTTP 应用，Node.js 的 HTTP API 是非常底层的。 它只涉及流处理与消息解析。 它把一个消息解析成消息头和消息主体，但不解析具体的消息头或消息主体。

- 接收到的原始消息头保存在 rawHeaders 属性中，它是一个 [key, value, key2, value2, ...] 数组。 例如，上面的消息头对象有一个类似以下的 rawHeaders 列表：

```js
[ 'ConTent-Length', '123456',
  'content-LENGTH', '123',
  'content-type', 'text/plain',
  'CONNECTION', 'keep-alive',
  'Host', 'mysite.com',
  'accepT', '*/*' ]
```

### 2.1. http.Agent 类

- Agent 负责为 HTTP 客户端管理连接的持续与复用。 它为一个给定的主机与端口维护着一个等待请求的队列，且为每个请求重复使用一个单一的 socket 连接直到队列为空，此时 socket 会被销毁或被放入一个连接池中，在连接池中等待被有着相同主机与端口的请求再次使用。 是否被销毁或被放入连接池取决于 keepAlive 选项。
  
- 连接池中的连接的 TCP Keep-Alive 是开启的，但服务器仍然可能关闭闲置的连接，在这种情况下，这些连接会被移出连接池，且当一个新的 HTTP 请求被创建时再为指定的主机与端口创建一个新的连接。 服务器也可能拒绝允许同一连接上有多个请求，在这种情况下，连接会为每个请求重新创建，且不能被放入连接池。 Agent 仍然会创建请求到服务器，但每个请求会出现在一个新的连接。
  
- 但一个连接被客户端或服务器关闭时，它会被移出连接池。 连接池中任何未被使用的 socket 会被释放，从而使 Node.js 进程在没有请求时不用保持运行。 （查看 socket.unref()）。
  
- 当 Agent 实例不再被使用时，建议 destroy() 它，因为未被使用的 socket 也会消耗操作系统资源。
  
- 当 socket 触发 'close' 事件或 'agentRemove' 事件时，它会被移出代理。 当打算长时间保持打开一个 HTTP 请求且不想它留在代理中，则可以如下处理：

> Syntax

```js
http.get(options, (res) => {
  // 处理事情
}).on('socket', (socket) => {
  socket.emit('agentRemove');
})
```

> Examples

```js
const http = require('http')

http.get({
    hostname: 'localhost',
    port: 80,
    path: '/',
    agent: false  // 创建一个新的代理，只用于本次请求
}, (res) => {
    console.log(res)
}).on('socket', (socket) => {
    socket.emit('agentRemove')
})
```

- 代理也可被用于单独的请求。 使用 {agent: false} 作为 http.get() 函数或 http.request() 函数的选项，则会为客户端连接创建一个默认配置的一次性使用的 Agent。
  

#### 2.1.1. new Agent

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