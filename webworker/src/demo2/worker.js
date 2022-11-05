let data = ''
onconnect = function (e) {
  let port = e.ports[0]
  
  port.onmessage = function (e) {
    
    if (e.data === 'get') {       // 如果是get 则返回数据给客户端
      port.postMessage(data)
    } else {                      // 否则把数据保存
      data = e.data
    }
  }
}