const express = require('express');
const app = express();

app.get('/333c',(req,res,next) => {
    console.log(req.params);
})

app.listen(3000)