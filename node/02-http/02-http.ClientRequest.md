# node

## 2. http

### 2.2. http.ClientRequest 类

- 该对象在 http.request() 内部被创建并返回。 它表示着一个正在处理的请求，其请求头已进入队列。 请求头仍可使用 setHeader(name, value)、getHeader(name) 和 removeHeader(name) API 进行修改。 实际的请求头会与第一个数据块一起发送或当调用 request.end() 时发送。

- 要获取响应，需为 'response' 事件添加一个监听器到请求对象上。 当响应头被接收到时，'response' 事件会从请求对象上被触发 。 'response' 事件被执行时带有一个参数，该参数是一个 http.IncomingMessage 实例。
  
- 在 'response' 事件期间，可以添加监听器到响应对象上，比如监听 'data' 事件。
  
- 如果没有添加 'response' 事件处理函数，则响应会被整个丢弃。 如果添加了 'response' 事件处理函数，则必须消耗完响应对象的数据，可通过调用 response.read()、或添加一个 'data' 事件处理函数、或调用 .resume() 方法。 数据被消耗完时会触发 'end' 事件。 在数据被读取完之前会消耗内存，可能会造成 'process out of memory' 错误。
  
- 注意：Node.js 不会检查 Content-Length 与已传输的请求主体的长度是否相等。
  
- 该请求实现了 可写流 接口。 它是一个包含以下事件的 EventEmitter：
  
#### 2.2.1. 'abort' 事件

- 当请求已被客户端终止时触发。 该事件仅在首次调用 abort() 时触发。
  
#### 2.2.2. 'connect' 事件

- 每当服务器响应 CONNECT 请求时触发。 如果该事件未被监听，则接收到 CONNECT 方法的客户端会关闭连接。
  
#### 2.2.3. 'continue' 事件

- 当服务器发送了一个 100 Continue 的 HTTP 响应时触发，通常是因为请求包含 Expect: 100-continue。 这是客户端将要发送请求主体的指令。

#### 2.2.4. 'response' 事件

- 当请求的响应被接收到时触发。 该事件只触发一次。

#### 2.2.5. 'socket' 事件

- 当 socket 被分配到请求后触发。
  
#### 2.2.6. 'upgrade' 事件

- 每当服务器响应 upgrade 请求时触发。 如果该事件未被监听，则接收到 upgrade 请求头的客户端会关闭连接。

#### 2.2.7 request.abort()

- 标记请求为终止。 调用该方法将使响应中剩余的数据被丢弃且 socket 被销毁。
  
#### 2.2.8 request.aborted

- 如果请求已被终止，则该属性的值为请求被终止的时间，从 1 January 1970 00:00:00 UTC 到现在的毫秒数。

#### 2.2.9 request.connection

#### 2.2.10 request.end([data[, encoding]][, callback])

- 结束发送请求。 如果部分请求主体还未被发送，则会刷新它们到流中。 如果请求是分块的，则会发送终止字符 '0\r\n\r\n'。
  
- 如果指定了 data，则相当于调用 request.write(data, encoding) 之后再调用 request.end(callback)。
  
- 如果指定了 callback，则当请求流结束时会被调用。
  
#### 2.2.11 request.flushHeaders

- 刷新请求头。

- 出于效率的考虑，Node.js 通常会缓存请求头直到 request.end() 被调用或第一块请求数据被写入。 然后 Node.js 会将请求头和数据打包成一个单一的 TCP 数据包。

- 通常那是期望的（因为它节省了 TCP 往返），除非第一个数据块很长时间之后才被发送。 request.flushHeaders() 可以绕过最优选择并提前开始请求。

#### 2.2.12 request.getHeader(name)

- 读取请求头

> Example

```js
const contentType = request.getHeader('Content-Type')
```

#### 2.2.12 request.removeHeader(name)

- 移除请求头中的一个对象

> Example

```js
const contentType = request.removeHeader('Content-Type')
```

#### 2.2.13 request.setHeader(name, value)

- 设置请求头

> Example

```js
request.setHeader('Content-Type', 'application/json')

//or

request.setHeader('Set-Cookie', ['type=ninja', 'language=javascript'])
```

#### 2.2.14 request.setNoDelay([noDelay])

- 一旦 socket 被分配给请求且已连接，socket.setNoDelay() 会被调用。

#### 2.2.15 request.setSocketKeepAlive([enable][, initialDelay])

- 一旦 socket 被分配给请求且已连接，socket.setKeepAlive() 会被调用。

#### 2.2.16 request.setSocketKeepAlive([enable][, initialDelay])





