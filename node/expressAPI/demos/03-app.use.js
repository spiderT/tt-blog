const express = require('express');
const app = express();

app.use((req,res,next) => {
    console.log('lalla', req.method, req.url);
    next();
})

app.use((req,res,next) => {
    res.send('hello world');
})

app.listen(3000)