let fs = require('fs');

fs.stat('./a.txt', function (err, stats) {
    if (err) {
        return console.error(err);
    }
    console.log(stats);
    console.log("读取文件信息成功！");

    // 检测文件类型
    console.log("是否为文件(isFile) ? " + stats.isFile());
    console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
});

/*
Stats {
    dev: 16777220,
        mode: 33188,
        nlink: 1,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 14629875,
        size: 63,
        blocks: 8,
        atime: 2017-08-03T09:36:11.000Z,
        mtime: 2017-08-03T09:11:08.000Z,
        ctime: 2017-08-03T09:11:08.000Z,
        birthtime: 2017-08-03T09:11:08.000Z }
读取文件信息成功！
是否为文件(isFile) ? true
    是否为目录(isDirectory) ? false
*/

