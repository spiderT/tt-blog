const http2 = require("http2");
const fs = require("fs");
const PORT = 8081;
//证书与私钥
const key = fs.readFileSync("./server.key");
const cert = fs.readFileSync("./server.crt");
//1、创建服务器
const server = http2.createSecureServer(
  {
    key,
    cert,
  },
  onRequest
);
//2、启动服务器
server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server listening on ${PORT}`);
});
//3、设置request事件函数
function onRequest(req, res) {
  const reqPath = req.url === "/" ? "/index.html" : req.url;
  //打印请求流的id和响应流的id
  console.log("req.stream.id:", req.stream.id);
  console.log("res.stream.id:", res.stream.id);
  //判断是否是首页
  if (reqPath === "/index.html") {
    //推送1.js
    res.stream.pushStream({ ":path": "/1.js" }, (err, pushStream, headers) => {
      if (err) throw err;
      pushStream.respond({ ":status": 200 });
      console.log("pushStream:", pushStream.id);
      pushStream.end("console.log(1)");
    });
    //推送2.js
    res.stream.pushStream({ ":path": "/2.js" }, (err, pushStream, headers) => {
      if (err) throw err;
      console.log("pushStream:", pushStream.id);
      pushStream.respond({ ":status": 200 });
      pushStream.end("console.log(2)");
    });
    const fd = fs.openSync("./index.html", "r");
    const stat = fs.fstatSync(fd);
    const headers = {
      "content-length": stat.size,
      "last-modified": stat.mtime.toUTCString(),
      "content-type": "text/html",
    };
    res.stream.respondWithFD(fd, headers);
  } else {
    res.end("404");
  }
}
