let fs = require('fs');

fs.appendFile('./a.txt','作者：李白', err => {
    if(err) throw err;
    console.log('was append to file');

})