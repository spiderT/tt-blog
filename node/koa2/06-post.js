const Koa = require('koa')
const app = new Koa()

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')

  for(let [index, queryStr] of queryStrList.entries()){
    let itemLsit  = queryStr.split('=')
    queryData[[itemLsit[0]]] = decodeURIComponent(itemLsit[1])
  }
  return queryData
}


function parsePostData(ctx) {
  return new Promise((resolve, reject) =>{
    try{
      let postdata = ''
      ctx.req.addListener('data',data=>{
        postdata += data
      })

      ctx.req.addListener('end',data =>{
        let parseData = parseQueryStr(postdata)
        resolve (parseData)
      })
    }catch(err){
      reject(err)
    }
  })
}


app.use(async ctx=>{
  if(ctx.url === '/' && ctx.method === 'GET'){
    let html = `
     <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `

    ctx.body = html

  }else if(ctx.url === '/'&& ctx.method === 'POST'){
    let postData = await parsePostData(ctx)
    ctx.body = postData
  }else {
    ctx.body = '<h1>404</h1>'
  }

})

app.listen(3000,()=>{
  console.log('app is starting at port 3000');
})