const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const multipart = require('connect-multiparty')//中间件 文件上传
const multipartMiddleware = multipart();

//https://www.npmjs.com/package/connect-multiparty

app.post('/upload',multipartMiddleware,(req,resp)=>{
    console.log(req.body, req.files);
})

