const http = require('http');

http.createServer(function (req,res) {
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write('<h1>hello</h1>')
    res.end('<p>world</p>')


}).listen(3000);

console.log('http server is running at port 3000');