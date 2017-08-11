const fs= require('fs');

fs.writeFile('./dir/2.txt','hello node',(err)=>{
    if(err) throw err;
    console.log('writed');
})

fs.writeFile('./dir/2.txt','hello world','utf8',(err)=>{
    if(err) throw err;
    console.log('writed');
})