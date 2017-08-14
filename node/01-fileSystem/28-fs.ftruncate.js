const fs = require('fs');
const assert = require('assert');

const fd = fs.openSync('./a.txt', 'r+');

// 截断文件至前4个字节
// fs.ftruncate(fd, 4, (err) => {
//     assert.ifError(err);
//     console.log(fs.readFileSync('./a.txt', 'utf8'));
// });


// 截断文件至前10个字节，但实际大小是7个字节
fs.ftruncate(fd, 10, (err) => {
    assert.ifError(err);
    console.log(fs.readFileSync('./a.txt'));
});