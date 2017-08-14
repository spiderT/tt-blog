const fs= require('fs');

fs.readFile('./a.txt',(err,data)=>{
    if(err) throw err;
    console.log(data);//如果未指定字符编码，则返回原始的 buffer。
    //<Buffer 61 62 63 64 65 66 67 0a 68 69 6a 6b 6c 6d 6e>
})

fs.readFile('./a.txt','utf8',(err,data)=>{
    if(err) throw err;
    console.log(data);
    //abcdefg hijklmn
})
