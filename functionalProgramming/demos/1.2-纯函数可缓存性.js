let memoize = function (f) {
    let cache = {}

    return function () {
        let arg_str = JSON.stringify(arguments)
        cache[arg_str] = cache[arg_str] || f.apply(f, arguments)
        return cache[arg_str]
    }
}

let squareNumber = memoize(function (x) {
    return x * x
})

console.log(squareNumber(4))
//=> 16

console.log(squareNumber(4)) // 从缓存中读取输入值为 4 的结果
//=> 16

console.log(squareNumber(5))
//=> 25

console.log(squareNumber(5)) // 从缓存中读取输入值为 5 的结果
//=> 25