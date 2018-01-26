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
    
    + 并行代码   
    
    

### 1.2 柯里化（curry）

概念：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

```js
// 你可以一次性地调用 curry 函数，也可以每次只传一个参数分多次调用。
// 它接受一个参数并返回一个新的函数。调用 add 之后，返回的函数就通过闭包的方式记住了 add 的第一个参数

const add = function (x) {
  return function (y) {
    return x + y
  }
}

const increment  = add(1)

console.log(increment(2)); //3
console.log(add(1)(2)); //3
```

策略性地把要操作的数据（String， Array）放到最后一个参数里。

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

f 和 g 都是函数，x 是在它们之间通过“管道”传输的值。

```js
let compose = function(f,g) {
  return function(x) {
    return f(g(x))
  }
}
```

在 compose 的定义中，g 将先于 f 执行，因此就创建了一个从右到左的数据流。

```js
const toUpperCase = function (x) {
  return x.toUpperCase()
}

const exclaim = function (x) {
  return x + '!'
}

const shout = compose(exclaim,toUpperCase)

console.log(shout('hello')); //HELLO!

```

结合律

```js
compose(toUpperCase, compose(head, reverse));

// 或者
compose(compose(toUpperCase, head), reverse);
```

#### 1.3.1 pointfree

pointfree 模式指的是:函数无须提及将要操作的数据是什么样的。一等公民的函数、柯里化（curry）以及组合协作起来非常有助于实现这种模式。

```js
// 非 pointfree，因为提到了数据：word
var snakeCase = function (word) {
  return word.toLowerCase().replace(/\s+/ig, '_');
};

// pointfree
var snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
```


#### 1.3.2 debug





### 1.4.1 of方法
### 1.4.2 Maybe 函子
### 1.4.3 Either 函子
### 1.4.4 ap 函子
### 1.4.5 Monad 函子



## 2. 实例

### 2.1 声明式代码

声明式代码不指定执行顺序，所以它天然地适合进行并行运算。它与纯函数一起解释了为何函数式编程是未来并行计算的一个不错选择——我们真的不需要做什么就能实现一个并行／并发系统。

```js
const cars = [
  {
    name: 'bwm',
    make: 'America'
  },
  {
    name: 'tt',
    make: 'Japan'
  }
]

// 命令式
let makes = [];
for (let i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}


// 声明式
let makes2 = cars.map(function (car) {
  return car.make;
});


console.log('makes', makes);  // makes [ 'America', 'Japan' ]
console.log('makes2', makes2);  // makes2 ['America', 'Japan']

```

## 3. Hindley-Milner 类型签名

## 3.1 类型


## 4. 容器

### 4.1 容器container






## x 函数式编程库
