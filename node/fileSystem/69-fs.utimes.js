const fs = require('fs');

fs.utimes('./a.txt',atime,mtime,(err)=>{
    if(err){
        throw err;
    }
    console.log('time update');//err,atime is not defined
})