const fs = require('fs');

fs.unlink('./dir/2.txt',(err)=>{
    if(err) throw err;
})