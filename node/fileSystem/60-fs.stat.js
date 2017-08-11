const fs = require('fs');

fs.stat('./a.txt', (err, stats) => {
    if(err){
        throw err;
    }else{
        console.log(stats);
    }
})