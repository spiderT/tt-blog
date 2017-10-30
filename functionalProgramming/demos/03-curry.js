const curry = require('lodash').curry

let match = curry((what, str) => str.match(what))

let filter = curry((f, ary) => ary.filter(f))

//参数遵循的模式。把要操作的数据（String， Array）放到最后一个参数里。

console.log(match(/\s+/g, "hello world"))//['']


let hasSpaces = match(/\s+/g)

console.log(hasSpaces("hello world"))//['']

console.log(filter(hasSpaces, ["tori_spelling", "tori amos"]))// ["tori amos"]

