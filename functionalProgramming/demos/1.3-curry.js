
// 你可以一次性地调用 curry 函数，也可以每次只传一个参数分多次调用。
// 它接受一个参数并返回一个新的函数。调用 add 之后，返回的函数就通过闭包的方式记住了 add 的第一个参数

/*
const add = function (x) {
  return function (y) {
    return x + y
  }
}

const increment  = add(1)

console.log(increment(2)); //3
console.log(add(1)(2)); //3
*/


const curry = require('lodash').curry

let match = curry((what, str) => str.match(what))

let filter = curry((f, ary) => ary.filter(f))

//参数遵循的模式。把要操作的数据（String， Array）放到最后一个参数里。

console.log(match(/\s+/g, "hello world"))//['']


let hasSpaces = match(/\s+/g)

console.log(hasSpaces("hello world"))//['']

console.log(filter(hasSpaces, ["tori_spelling", "tori amos"]))// ["tori amos"]

