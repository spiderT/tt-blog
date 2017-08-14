const fs = require('fs');

fs.open('./a.txt' , 'r' , function (err,fd) {
    if (err) {
        console.error(err);
        return;
    }
    const buf = new Buffer(8);
    fs.read(fd, buf, 0, 8, null, function(err,bytesRead, buffer){
        if(err){
            console.log(err);
            return;
        }
        console.log('bytesRead' +bytesRead);
        console.log(buffer);
    })
})