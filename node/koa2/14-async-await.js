const Koa = require('koa')
const app = new Koa()
const fs = require('fs')

function render( file ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `${file}`
    fs.readFile(viewUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}


app.use( async ( ctx ) => {
  let html = await render('./file.html')
  ctx.body = html
})

app.listen(3000)
console.log('[demo] start-async is starting at port 3000')