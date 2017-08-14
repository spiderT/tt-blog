let fs = require('fs');

fs.watch('./a.txt',{encoding:'buffer'},(eventType,filename) => {
    if(filename){
        console.log(filename);
    }
})