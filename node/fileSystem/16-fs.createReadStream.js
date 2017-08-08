let fs= require('fs');

// console.log(fs.createReadStream('a.txt', {start: 10, end: 15}));
console.log(fs.createWriteStream('a.txt', {start: 10, end: 15}));