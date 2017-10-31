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