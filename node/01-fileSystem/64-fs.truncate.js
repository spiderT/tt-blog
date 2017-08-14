const fs = require('fs');

fs.truncate('./a.txt',10,function (err) {
    if(err) throw err;
})