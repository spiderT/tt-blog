const fs = require('fs');

fs.symlink('./a.txt','./dir/a.txt',function (err) {
    if(err) console.log(err);
})