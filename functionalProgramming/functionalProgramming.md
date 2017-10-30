# 函数式编程

## 1 基本概念

### 1.1 纯函数

概念：纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。

- 比如 slice（纯的） 和 splice（不纯的）

```js
let arr = [1, 2, 3, 4, 5, 6, 7]

arr.slice(0, 3)//[1,2,3]
arr.slice(0, 3)//[1,2,3]
arr.slice(0, 3)//[1,2,3]

arr.splice(0, 3)//[1,2,3]
arr.splice(0, 3)//[4,5,6]
arr.splice(0, 3)//[7]

```
- 追求“纯”的理由

    + 首先，纯函数总能够根据输入来做缓存。实现缓存的一种典型方式是 memoize 技术
    
    ```js
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
    ```
    
    + 可移植性／自文档化（Portable / Self-Documenting）
    
    + 可测试性（Testable）-Quickcheck——一个为函数式环境量身定制的测试工具。
    
    + 合理性（Reasonable）
    
    

### 1.2 柯里化（curry）

概念：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

```js
const curry = require('lodash').curry

let match = curry((what, str) => str.match(what))

let filter = curry((f, ary) => ary.filter(f))

//参数遵循的模式。把要操作的数据（String， Array）放到最后一个参数里。

console.log(match(/\s+/g, "hello world"))//['']


let hasSpaces = match(/\s+/g)

console.log(hasSpaces("hello world"))//['']

console.log(filter(hasSpaces, ["tori_spelling", "tori amos"]))// ["tori amos"]

```

- 这里表明的是一种“预加载”函数的能力，通过传递一到两个参数调用函数，就能得到一个记住了这些参数的新函数。


### 1.3 代码组合（compose）

```js
let compose = function(f,g) {
  return function(x) {
    return f(g(x))
  }
}
```





### 1.3.1 of方法
### 1.3.2 Maybe 函子
### 1.3.3 Either 函子
### 1.3.4 ap 函子
### 1.3.5 Monad 函子

## 2 函数式编程库
