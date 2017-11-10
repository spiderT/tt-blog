const os = require('os');
const path = require('path');
const koaBody = require('koa-body');
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

const main = async ctx => {
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || 0;

    for(let key in files){
        const file = files[key];
        const filePath = path.join(tmpdir,file.name);
        const render = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        render.pipe(writer);
        filePaths.push(filePath);
    }
    ctx.body = filePaths;
}

app.use(koaBody({multipart:true}))
app.use(main)
app.listen(3000)