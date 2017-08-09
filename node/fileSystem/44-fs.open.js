const fs = require('fs');

fs.open('./a.txt','a',function (err,fd) {
    if(err) throw err;
    fs.futimes(fd, 1388648322, 1388648322, function (err) {
        if (err) {
            throw err;
        }
        console.log('futimes complete');
        fs.close(fd, function () {
            console.log('Done');
        });
    });
})