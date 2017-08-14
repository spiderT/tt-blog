let fs = require('fs');

fs.access('./a.txt', fs.constants.R_OK | fs.constants.W_OK, err => {
    console.log(err ? 'no access' : 'can read/write')
})
//can read/write
