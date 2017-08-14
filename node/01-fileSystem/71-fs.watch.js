const fs = require('fs');

fs.watch('./dir', (eventType, filename) => {
    console.log(`事件类型${eventType}`);
    if (filename) {
        console.log(`提供的文件名${filename}`)
    } else {
        console.log('未提供文件名');
    }
})