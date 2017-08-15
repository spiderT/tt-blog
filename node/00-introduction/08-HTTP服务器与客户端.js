// const http = require('http');
//
// http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.write('<h1>hello world</h1>')
//     res.end('<p>hello node</p>')
// }).listen(3000);
//
// console.log('http server is listening at port 3000');


// const http = require('http');
//
// const server = new http.Server();
//
// server.on('request',(req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.write('<h1>hello world1</h1>')
//     res.end('<p>hello node1</p>')
// }).listen(3000);
// console.log('http server is listening at port 3000');


// const http = require('http');
// const url = require('url');
// const util = require('util');
//
// http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/plain'});
//     res.end(util.inspect(url.parse(req.url,true)));
// }).listen(3000);
// //浏览器中输入http://localhost:3000/mail?sid=j4K1GWc-mi_9V38m,2&r=151470e2aaa0e4b36409aa30b64a3817
// /*
// Url {
//     protocol: null,
//         slashes: null,
//         auth: null,
//         host: null,
//         port: null,
//         hostname: null,
//         hash: null,
//         search: '?sid=j4K1GWc-mi_9V38m,2&r=151470e2aaa0e4b36409aa30b64a3817',
//         query:
//     { sid: 'j4K1GWc-mi_9V38m,2',
//         r: '151470e2aaa0e4b36409aa30b64a3817' },
//     pathname: '/mail',
//         path: '/mail?sid=j4K1GWc-mi_9V38m,2&r=151470e2aaa0e4b36409aa30b64a3817',
//         href: '/mail?sid=j4K1GWc-mi_9V38m,2&r=151470e2aaa0e4b36409aa30b64a3817' }*/


// const http = require('http');
// const querystring = require('querystring');
//
// const contents = querystring.stringify({
//     name: 'abc',
//     email: '133@11.com',
//     address: '南京西路699号',
// })
//
// const options = {
//     host: 'www.baidu.com',
//     path: '/application/node/post.php',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': contents.length
//     }
// }
//
// let req = http.request(options, res => {
//     res.setEncoding('utf8');
//     res.on('data', data => {
//         console.log(data);
//     })
// });
//
// req.write(contents);
// req.end();
//
// /*<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
// <html><head>
// <title>302 Found</title>
// </head><body>
// <h1>Found</h1>
// <p>The document has moved <a href="http://www.baidu.com/search/error.html">here</a>.</p>
// </body></html>*/


const http= require('http');

http.get({host:'www.baidu.com'},res=>{
    res.setEncoding('utf8');
    res.on('data',function (data) {
        console.log(data);
    })
})



