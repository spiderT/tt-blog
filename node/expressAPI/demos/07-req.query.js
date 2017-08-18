const express = require('express')
const app = express();


app.get('/user/:id?',(req,res) => {
    console.log(req.query)
    res.end('lalla');
})

app.listen(3000)

//访问http://localhost:3000/user?q=anv
//控制台打印{ q: 'anv' }
