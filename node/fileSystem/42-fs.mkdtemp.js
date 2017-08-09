const fs = require('fs');

// fs.mkdtemp('/tmp/foo-', (err, folder) => {
//     if (err) throw err;
//     console.log(folder);// /tmp/foo-MpGHPd
//
// });


// 新建的临时目录的父目录
const tmpDir = '/tmp';

const { sep } = require('path');
fs.mkdtemp(`${tmpDir}${sep}`, (err, folder) => {
    if (err) throw err;
    console.log(folder);
    // /tmp/OO46qa
});
