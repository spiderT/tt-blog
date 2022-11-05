# JS

- [JS](#js)
  - [1. 事件机制/Event Loop（进程，线程，协程，宏任务，微任务）](#1-事件机制event-loop进程线程协程宏任务微任务)
  - [2. 执行上下文/作用域链/闭包](#2-执行上下文作用域链闭包)
  - [3. 原型/继承](#3-原型继承)
  - [4. this/call/apply/bind/new](#4-thiscallapplybindnew)
  - [5. 手写 Promise, Promise.all, Promise.race](#5-手写-promise-promiseall-promiserace)
  - [6. 手写async await](#6-手写async-await)
  - [7. 深浅拷贝](#7-深浅拷贝)
    - [7.1. 浅拷贝](#71-浅拷贝)
    - [7.2  深拷贝](#72--深拷贝)
    - [7.3. 拷贝函数](#73-拷贝函数)
    - [7.4. 拷贝正则表达式](#74-拷贝正则表达式)
    - [7.5. 拷贝symbol 值](#75-拷贝symbol-值)
    - [7.6. 拷贝时间](#76-拷贝时间)
  - [8. 函数式编程](#8-函数式编程)
  - [9. Service Worker](#9-service-worker)
  - [10. Web Worker](#10-web-worker)
  - [11. ES6、ES7、ES8](#11-es6es7es8)
  - [面试题](#面试题)
    - [1. 手动实现防抖debounce、节流throttle](#1-手动实现防抖debounce节流throttle)
    - [2. node require 和 import 的区别](#2-node-require-和-import-的区别)
    - [3. arguments 是数组吗？如果不是，怎么转换成数组？](#3-arguments-是数组吗如果不是怎么转换成数组)
    - [4. 实现一个 add 方法，使计算结果能够满足如下预期： add(1)(2)(3) () add(1, 2, 3)(4)()](#4-实现一个-add-方法使计算结果能够满足如下预期-add123--add1-2-34)
    - [4.1 实现一个函数 sum， 运算结果可以满足如下预期结果](#41-实现一个函数-sum-运算结果可以满足如下预期结果)
    - [5. 手写EventEmitter](#5-手写eventemitter)
    - [6. 关于异步任务执行的题目，涉及主线程任务、宏任务、微任务](#6-关于异步任务执行的题目涉及主线程任务宏任务微任务)
    - [7. 变量提升，函数内 var 和 let 声明的执行结果各怎样](#7-变量提升函数内-var-和-let-声明的执行结果各怎样)
    - [8. 场景：从 1-10，按顺序每秒输出一个数字](#8-场景从-1-10按顺序每秒输出一个数字)
    - [9. 浏览器是单进程吗？进行和线程的区别？](#9-浏览器是单进程吗进行和线程的区别)
    - [10. 惰性求值](#10-惰性求值)
    - [11. ts class 里面怎么实现一个 runtime 里面访问不到 private 的属性](#11-ts-class-里面怎么实现一个-runtime-里面访问不到-private-的属性)
    - [12. 闭包的变量内存怎么分布的](#12-闭包的变量内存怎么分布的)
    - [13. 协程与同步异步](#13-协程与同步异步)
    - [14. 什么时候传值，什么时候传变量](#14-什么时候传值什么时候传变量)
    - [15. promise 是如何实现链式调用的，为什么每次返回新 Promise, 像 jquery 那样直接返回 this 不行吗?](#15-promise-是如何实现链式调用的为什么每次返回新-promise-像-jquery-那样直接返回-this-不行吗)
    - [16. 顺序延时输出数组里的每一项](#16-顺序延时输出数组里的每一项)
    - [17. 在哪些情况下一个元素绑定的点击事件不会被触发](#17-在哪些情况下一个元素绑定的点击事件不会被触发)
    - [18. 写了一个数据去重的算法](#18-写了一个数据去重的算法)
    - [19. 柯里化操作编程](#19-柯里化操作编程)
    - [20. 页面中某个请求特别慢可能原因定位](#20-页面中某个请求特别慢可能原因定位)
    - [21. 如何采集错误](#21-如何采集错误)
    - [22. 如何解决 window.onerror 监听跨 iframe 错误?](#22-如何解决-windowonerror-监听跨-iframe-错误)
    - [23. async & defer](#23-async--defer)
    - [24. 前端异步流的题:修改 Scheduler 类 add 方法，维护最大并发为两个](#24-前端异步流的题修改-scheduler-类-add-方法维护最大并发为两个)
    - [25. 原型链实现对象的继承](#25-原型链实现对象的继承)
    - [26. 上传文件的方法](#26-上传文件的方法)
    - [27. JS中函数参数值传递和引用传递](#27-js中函数参数值传递和引用传递)
    - [28. Instanceof的原理，如何实现](#28-instanceof的原理如何实现)
    - [29. 图片懒加载的方式](#29-图片懒加载的方式)
    - [30. 数组flat方法，以及参数](#30-数组flat方法以及参数)
    - [31. This作用域](#31-this作用域)
    - [32. 判断变量的类型的方法](#32-判断变量的类型的方法)
    - [33. Promise.all用过吗？怎么实现？和promise.any以及promise.race的区别，怎样实现promise.allSettled？怎样实现⼀组promise的链式调用？怎样让⼀组promise同步执行？除了promise有什么其它解决异步的方式](#33-promiseall用过吗怎么实现和promiseany以及promiserace的区别怎样实现promiseallsettled怎样实现组promise的链式调用怎样让组promise同步执行除了promise有什么其它解决异步的方式)
    - [34. Async函数用过吗，有看过babel编译后的ES5代码吗](#34-async函数用过吗有看过babel编译后的es5代码吗)
    - [35. 字符串拼接的性能问题](#35-字符串拼接的性能问题)
    - [36. 对数字进行处理，千分位分割](#36-对数字进行处理千分位分割)
    - [37. 求dom的层级深度](#37-求dom的层级深度)
    - [38. 哪些是类数组，怎么区分是类数组？](#38-哪些是类数组怎么区分是类数组)
    - [39. ts T](#39-ts-t)
    - [40. 实现isArray函数](#40-实现isarray函数)

## 1. 事件机制/Event Loop（进程，线程，协程，宏任务，微任务）

参考：https://time.geekbang.org/column/article/132931  

协程：https://zhuanlan.zhihu.com/p/148152129  
https://zhuanlan.zhihu.com/p/148462034  

![event](images/js/Event.png)

1. 添加一个消息队列；
2. IO 线程中产生的新任务添加进消息队列尾部；
3. 渲染主线程会循环地从消息队列头部中读取任务，执行任务。

如果其他进程想要发送任务给页面主线程，那么先通过 IPC 把任务发送给渲染进程的 IO 线程，IO 线程再把任务发送给页面主线程。

1. JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。
2. Javascript单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。

在JavaScript中，任务被分为两种，一种宏任务（MacroTask）也叫Task，一种叫微任务（MicroTask）。  

> MacroTask（宏任务）

1. 渲染事件（如解析 DOM、计算布局、绘制）；
2. 用户交互事件（如鼠标点击、滚动页面、放大缩小等）；
3. JavaScript 脚本执行事件；
4. 网络请求完成、文件读写完成事件。

> MicroTask（微任务）
Process.nextTick（Node独有）、Promise、MutationObserver

在当前宏任务中的 JavaScript 快执行完成时，也就在 JavaScript 引擎准备退出全局执行上下文并清空调用栈的时候，JavaScript 引擎会检查全局执行上下文中的微任务队列，然后按照顺序执行队列中的微任务。  

如果在执行微任务的过程中，产生了新的微任务，同样会将该微任务添加到微任务队列中，V8 引擎一直循环执行微任务队列中的任务，直到队列为空才算执行结束。也就是说在执行微任务过程中产生的新的微任务并不会推迟到下个宏任务中执行，而是在当前的宏任务中继续执行。  

## 2. 执行上下文/作用域链/闭包

> 执行上下文  

LIFO（后进先出）数据结构的栈，被用来存储代码运行时创建的所有执行上下文。  
引擎会执行那些执行上下文位于栈顶的函数。当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文。  

> 作用域  
JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。
因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。  

```js
var value = 1;
function foo() {
    console.log(value); // 1
}
function bar() {
    var value = 2;
    foo();
}
bar();
```

> 作用域链

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

> 闭包

闭包就是将函数内部和函数外部连接起来的一座桥梁。

用途：

1. 可以读取函数内部的变量。  
2. 让这些变量的值始终保持在内存中。  

## 3. 原型/继承

参考：https://juejin.cn/post/6844903984335945736  

## 4. this/call/apply/bind/new

> this

1. 当函数作为对象的方法调用时，函数中的 this 就是该对象；
2. 当函数被正常调用时，在严格模式下，this 值是 undefined，非严格模式下 this 指向的是全局对象 window；
3. 嵌套函数中的 this 不会继承外层函数的 this 值。

- React事件处理函数必须使用bind(this)的原因: React构造方法中的bind即将handleClick函数与这个组件Component进行绑定以确保在这个处理函数中使用this时可以时刻指向这一组件。
- 箭头函数this: ES6 中的箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。  
- 关于setInterval和setTimeout中的this指向问题: this是指向了window对象，这是由于setTimeout()调用的代码运行在与所在函数完全分离的执行环境上。

## 5. 手写 Promise, Promise.all, Promise.race

参考：https://juejin.cn/post/6844903625769091079  
https://juejin.cn/post/6844903509934997511  

## 6. 手写async await

参考：https://zhuanlan.zhihu.com/p/338009998  

## 7. 深浅拷贝

参考：https://github.com/yygmind/blog/issues/29  

引用类型值指的是那些保存在堆内存中的对象，所以引用类型的值保存的是一个指针，这个指针指向存储在堆中的一个对象。Object 类型。细分的话，有：Object 类型、Array 类型、Date 类型、RegExp 类型、Function 类型 等。
因此深拷贝和浅拷贝只发生在引用类型中。  

浅拷贝 只会将对象的各个属性进行依次复制，并不会进行递归复制，也就是说只会赋值目标对象的第一层属性。  
深拷贝不同于浅拷贝，它不只拷贝目标对象的第一层属性，而是**递归拷贝**目标对象的所有属性。开辟新的栈。  

### 7.1. 浅拷贝

1. ... 展开运算符
2. Object.assign()
3. Array.concat()——数组
4. 代码实现

```js
function shallowClone(source) {
  var target = {};
  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      target[i] = source[i];
    }
  }
  return target;
}
```

### 7.2  深拷贝

主要是两种

1. 利用 JSON 对象中的 parse 和 stringify——缺陷：undefined、任意的函数、正则表达式类型以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时)；
2. 利用递归来实现每一层都重新创建对象并赋值

```js
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function cloneDeep(source, hash = new WeakMap()) {
  if (!isObject(source)) return source; 
  if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表
    
  var target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 新增代码，哈希表设值
  
  for(var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (isObject(source[key])) {
              target[key] = cloneDeep(source[key], hash); // 新增代码，传入哈希表
          } else {
              target[key] = source[key];
          }
      }
  }
  return target;
}
```

### 7.3. 拷贝函数

```js
function cloneFunction(func) {
  // 理解 new Function 创建函数方法: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    // console.log("param", param);
    // console.log("body", body);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}
```

### 7.4. 拷贝正则表达式

```js
RegExp.prototype.clone = function () {
  const pattern = this.valueOf();
  console.log("pattern.source", pattern.source);
  console.log("pattern.global", pattern.global);
  console.log("pattern.lastIndex", pattern.lastIndex);
  let flags = "";
  // 是否开启全局匹配
  flags += pattern.global ? "g" : "";
  // 是否要忽略字符的大小写
  flags += pattern.ignoreCase ? "i" : "";
  // 是否开启多行模式匹配（影响 ^ 和 $ 的行为）
  flags += pattern.multiline ? "m" : "";
  const result = new RegExp(pattern.source, flags);
  // lastIndex 下次匹配开始的字符串索引位置。
  result.lastIndex = pattern.lastIndex;
  return result;
};
```

### 7.5. 拷贝symbol 值

Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

但是，它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

```js
function cloneSymbol(source){
  const target = Array.isArray(source) ? [] : {};
  let symKeys = Object.getOwnPropertySymbols(source); // 查找
  if (symKeys.length) {
    // 查找成功
    symKeys.forEach((symKey) => {
      if (isObject(source[symKey])) {
        target[symKey] = deepClone(source[symKey], hash);
      } else {
        target[symKey] = source[symKey];
      }
    });
  }
  return target;
}

```

### 7.6. 拷贝时间

```js
Date.prototype.clone = function () {
  // valueOf方法对于：如果存在任意原始值，它就默认将对象转换为表示它的原始值
  return new Date(this.valueOf());
};
```

## 8. 函数式编程

参考资料：https://github.com/mqyqingfeng/Blog/issues/42  

纯函数就是数学上的函数，而且是函数式编程的全部。  
纯函数总是能够根据相同的输入返回相同的输出，所以它们就能够保证总是返回同一个结果，这也就保证了引用透明性。  

1. 可缓存性（Cacheable）
2. 可移植性／自文档化（Portable / Self-Documenting）
3. 可测试性（Testable）
4. 合理性（Reasonable）

> 柯里化curry  

只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。  
用途可以理解为：参数复用。本质上是降低通用性，提高适用性。  

> 函数组合compose  

感觉和webpack的loader很像，单一职责，通过 数据流方式向下处理

f 和 g 都是函数，x 是在它们之间通过“管道”传输的值。  

```js
var compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
};
```

```js
// 结合律（associativity）
var associative = compose(f, compose(g, h)) == compose(compose(f, g), h);
```

## 9. Service Worker

https://github.com/qq449245884/xiaozhi/issues/8  

## 10. Web Worker

https://juejin.cn/post/6844903736238669837  

## 11. ES6、ES7、ES8

1. Symbol: https://www.yuque.com/ostwind/es6/docs-symbol
2. Iterator 和 for...of 循环: https://www.yuque.com/ostwind/es6/docs-iterator
3. Generator: https://www.yuque.com/ostwind/es6/docs-generator
4. Reflect: https://www.yuque.com/ostwind/es6/docs-reflect
5. Proxy: https://www.yuque.com/ostwind/es6/docs-proxy
6. Promise: https://www.yuque.com/ostwind/es6/docs-promise
7. Class: https://www.yuque.com/ostwind/es6/docs-class
8. Module: https://www.yuque.com/ostwind/es6/docs-module  https://www.yuque.com/ostwind/es6/docs-module-loader
9. 对象的扩展: https://www.yuque.com/ostwind/es6/docs-object
10. 函数的扩展: https://www.yuque.com/ostwind/es6/docs-function
11. 数组的扩展: https://www.yuque.com/ostwind/es6/docs-array

## 面试题

### 1. 手动实现防抖debounce、节流throttle

经过 debounce 防抖处理后，只响应最后一次，因为防抖本质上就是通过延迟，所以实际执行函数时机会晚于函数的请求时机；  
而经过 throttle 节流处理后，是按一定的频率来处理这堆频繁调用的函数，每个周期内，只响应第一次，过滤后面的请求，直到下个周期。  

> 1. 防抖  

将多次操作合并为一次操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。  

实现方式：每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法；  
缺点：如果事件在规定的时间间隔内被不断的触发，则调用方法会被不断的延迟；  
应用场景：

- search搜索，用户不断输入值时，用防抖来节约Ajax请求,也就是输入框事件。
- window触发resize时，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

```js
function debounce(fn, delay = 200) {
  if (typeof fn !== "function") {
    // 参数类型为函数
    throw new TypeError("fn is not a function");
  }
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    clearTimeout(timeout);
    // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
```

> 2. 节流

当一个函数被频繁执行，而你希望它只是在某个时间段内只执行一次。  
实现方式：每次触发事件时，如果当前有等待执行的延时函数，则直接return  
应用场景：

- 滚动监听
- 窗口resize

```js
function throttle(fn, delay = 1000) {
  let flag = true; // 是否已有定时器
  let timer = null;
  return function (...args) {
    if (!flag) return;
    flag = false;
    clearTimeout(timer); // 清除
    timer = setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
}
```

### 2. node require 和 import 的区别

参考：https://www.yuque.com/ostwind/es6/docs-module-loader#15235937  

1. import是ES6标准中的模块化解决方案，require是node中遵循CommonJS规范的模块化解决方案。
2. import是编译时加载，必须放在模块顶部，在性能上比后者好一些；require是运行时加载，理论来说放在哪里都可以。CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
3. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

### 3. arguments 是数组吗？如果不是，怎么转换成数组？

arguments对象是所有（非箭头）函数中都可用的局部变量。https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments  

arguments是个类数组，除了有实参所组成的类似数组以外，还有自己的属性，如callee，arguments.callee就是当前正在执行的这个函数的引用，它只在函数执行时才存在。因为在函数开始执行时，才会自动创建第一个变量arguments对象。  

将arguments转换为真正的数组的方法

1. Array.prototype.slice.apply(arguments)     [].slice.apply(arguments)  
   slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。  

2. 使用ES6的新语法 Array.from() 来转换: Array.from 方法用于将两类对象转为真正的数组：类似数组的对象和可遍历对象（包括Set和Map）。

3. [...arguments];

4. arguments[Symbol.isConcatSpreadable] = true;  [].concat(arguments).

### 4. 实现一个 add 方法，使计算结果能够满足如下预期： add(1)(2)(3) () add(1, 2, 3)(4)()

函数的柯里化和闭包特性  

```js
// 函数的柯里化和闭包特性
function add(...arg) {
  const a = [...arg];
  const _add = function (...innerArg) {
    if (innerArg.length === 0) {
      return a.reduce((a, b) => a + b);
    } else {
      [].push.apply(a, innerArg);
      return _add;
    }
  };
  return _add;
}

const v = add(1)(2)(3)(); // 6
const v2 = add(1, 2, 3)(4)(); // 10
```

延展：JS函数柯里化（curry）和函数合成（compose）: http://c.biancheng.net/view/5744.html  

### 4.1 实现一个函数 sum， 运算结果可以满足如下预期结果

```js
// sum(1, 2, 3).valueOf(); //6 
// sum(2, 3)(2).valueOf(); //7 
// sum(1)(2)(3)(4).valueOf(); //10
function sum() {
  const prevSum = [...arguments].reduce((a,b) => a + b);
  const result = function() {
     return sum(...[...arguments,prevSum]);
  }
  result.valueOf = function() {
      return prevSum;
  }
  return result;
}
```

### 5. 手写EventEmitter

见JS/question/5-EventEmitter.js  

### 6. 关于异步任务执行的题目，涉及主线程任务、宏任务、微任务

```js
console.log("begin");

setTimeout(() => {
  console.log("settimeout1");

  Promise.resolve()
    .then(() => {
      console.log("promise1");

      setTimeout(() => {
        console.log("settimeout2 between promise1&2");
      });
    })
    .then(() => console.log("promise2"));
}, 0);

console.log('end')


// begin
// end
// settimeout1
// promise1
// promise2
// settimeout2 between promise1&2
```

### 7. 变量提升，函数内 var 和 let 声明的执行结果各怎样

```js
var a = 10;
function say() {
  console.log(a);
  // var a = 20;
  let a = 20;
  console.log(a);
}

// say() // var a = 20; undefined  20
say() // let a = 20; ReferenceError: Cannot access 'a' before initialization
```

### 8. 场景：从 1-10，按顺序每秒输出一个数字

参考答案： https://blog.csdn.net/weixin_39147099/article/details/83830587  

### 9. 浏览器是单进程吗？进行和线程的区别？

参考：https://www.cnblogs.com/dailc/p/8325991.html  

### 10. 惰性求值

惰性求值就是：对于一个表达式，在不需要值的时候不计算，需要的时候才计算。  

https://zhuanlan.zhihu.com/p/24138694  

https://github.com/dtao/lazy.js  

https://github.com/luobotang/simply-lazy  

### 11. ts class 里面怎么实现一个 runtime 里面访问不到 private 的属性

扩展: private、protected、public、static： https://www.tslang.cn/docs/handbook/classes.html  

### 12. 闭包的变量内存怎么分布的

https://blog.csdn.net/weixin_40013817/article/details/103287271  

闭包的变量内存在堆里  

### 13. 协程与同步异步

参考： http://www.ruanyifeng.com/blog/2015/04/generator.html  
https://www.yuque.com/ostwind/es6/docs-generator#b4ae42b7  

协程本身是个函数，协程之间的切换本质是函数执行权的转移。  
生成器函数的yield关键字有可以交出函数的执行权，挂起自身，然后 JavaScript 引擎去执行这个函数后面的语句.  

扩展：手写co函数： http://www.ruanyifeng.com/blog/2015/05/co.html  

1. co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。
2. 在返回的 Promise 对象里面，co 先检查参数 gen 是否为 Generator 函数。如果是，就执行该函数，得到一个内部指针对象；如果不是就返回，并将 Promise 对象的状态改为 resolved 。
3. 接着，co 将 Generator 函数的内部指针对象的 next 方法，包装成 onFulefilled 函数。这主要是为了能够捕捉抛出的错误。
4. 最后，就是关键的 next 函数，它会反复调用自身。

### 14. 什么时候传值，什么时候传变量

参考： http://www.ruanyifeng.com/blog/2015/05/thunk.html

### 15. promise 是如何实现链式调用的，为什么每次返回新 Promise, 像 jquery 那样直接返回 this 不行吗?

### 16. 顺序延时输出数组里的每一项

### 17. 在哪些情况下一个元素绑定的点击事件不会被触发

动态添加的元素

### 18. 写了一个数据去重的算法

https://www.jb51.net/article/176903.htm  

### 19. 柯里化操作编程

https://www.jianshu.com/p/2975c25e4d71  

把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。  

### 20. 页面中某个请求特别慢可能原因定位

### 21. 如何采集错误

window.onerror
window.addeventlister('unhandledrejection')
console.error
window.frames[0].onerror

### 22. 如何解决 window.onerror 监听跨 iframe 错误?

https://www.cnblogs.com/liuhao-web/p/13184486.html  

```js
window.frames[0].onerror = function (message, source, lineno, colno, error) {
    console.log('捕获到 iframe 异常：', {message, source, lineno, colno, error});
  };
```

### 23. async & defer

https://zhuanlan.zhihu.com/p/292953374  

> defer

1. 不阻止解析 document， 并行下载 d.js, e.js
2. 即使下载完 d.js, e.js 仍继续解析 document
3. 按照页面中出现的顺序，在其他同步脚本执行后，DOMContentLoaded 事件前 依次执行 d.js, e.js。

> async

1. 不阻止解析 document, 并行下载 b.js, c.js
2. 当脚本下载完后立即执行。（两者执行顺序不确定，执行阶段不确定，可能在 DOMContentLoaded 事件前或者后 ）

### 24. 前端异步流的题:修改 Scheduler 类 add 方法，维护最大并发为两个

```js
class Scheduler {
  async add(promiseFunc: () => Promise<void>): Promise<void> {}
}
const scheduler = new Scheduler();

const timeout = (time) => {
  return new Promise((r) => setTimeout(r, time));
};

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4); // log: 2 3 1 4
```

### 25. 原型链实现对象的继承

组合式继承：通过借用构造函数来继承属性,通过原型链的形式来继承方法.

```js
function inheritPrototype(Female,Person){ 
  var protoType = Object.create(Person.prototype);
  protoType.constructor = Female;
  Female.prototype = protoType;
}
//取代
//Female.prototype=new Person();
//Female.prototype.constrcutor=Female
```

### 26. 上传文件的方法

https://www.jianshu.com/p/5147e36cf19c

使用FormData来实现  

```js
var form = new FormData();
form.append("file", file); //第一个参数是后台读取的请求key值
form.append("fileName", file.name);
form.append("other", "666666"); //实际业务的其他请求参数
var xhr = new XMLHttpRequest();
var action = "http://localhost:8080/upload.do"; //上传服务的接口地址
xhr.open("POST", action);
xhr.send(form); //发送表单数据
xhr.onreadystatechange = function(){
  if(xhr.readyState==4 && xhr.status==200){
    var resultObj = JSON.parse(xhr.responseText);
    //处理返回的数据......
  }
}
```

### 27. JS中函数参数值传递和引用传递

当我们对函数进行传参时，函数会将这些数据拷贝赋值给函数的参数变量：  

1. 对于基本数据类型的参数，传递的是变量的值。  
2. 对于引用类型的参数来说，传递的是对象的地址。  

### 28. Instanceof的原理，如何实现

```js
function instance_of(L, R) {
  //L 表示左表达式，R 表示右表达式
  const O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null) return false;
    if (O === L) return true;
    L = L.__proto__;
  }
}
```

### 29. 图片懒加载的方式

浏览器是否发起亲求就是根据是否有src属性决定的。  

1. 如果：offsetTop-scroolTop<clientHeight，则图片进入了可视区内，则被请求

2. getBoundingClientRect: 在bound.top<=clientHeight时，图片是在可视区域内的。

3. IntersectionObserver：一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。

### 30. 数组flat方法，以及参数

var newArray = arr.flat([depth])  

depth 可选: 指定要提取嵌套数组的结构深度，默认值为 1。  

### 31. This作用域

在函数内部，this 的值取决于被调用的方式。  

1. 在严格模式下，如果this没有被执行环境定义，那它保持为undefined。
2. 在非严格模式下，默认为全局对象。
3. call和apply函数，将this值绑定到调用中的特定对象
4. 箭头函数，this与封闭环境的this保持一致
5. 对象的方法，当函数作为对象的方法被调用时，它们的this是调用该函数的对象
6. 作为构造对象，当一个函数用作构造函数时（使用new关键字）
7. 虽然构造器返回的默认值是this所指的那个对象，但它仍可以手动返回其他的对象（如果返回值不是一个对象，则返回this对象）

### 32. 判断变量的类型的方法

参考：https://blog.csdn.net/u010998803/article/details/80732942

常用的变量类型有11种：Number,String,Boolean,Object,Array,Json,Function,undefined,Null,Date,RegExp,Error  

1. 使用typeof能判断出四种，分别是number，string，boolean，object，剩余的均被检测为object

2. 使用instanceof，根据instanceof的定义：判断参照对象的prototype属性所指向的对象是否在被行测对象的原型链上，这种变量判断可以检测出9种,undefined和null被检测为object,因为js中没有这种全局类型

```js
let num =new Number(1);
let str =  new String('abc');
let bool = new Boolean(true);
// 这样定义才能检测出
let num = 1;
let str = 'abc';
let bool = true;
// 这样定义是检测不出来的
```

3. 使用constructor检测，constructor是原型对象的属性指向构造函数。这种方式解决了instanceof的弊端,可以检测出除了undefined和null的9种类型,但是这种方式仍然有个弊端,就是constructor所指向的的构造函数是可以被修改的.

4. Object.prototype.toString.call  

### 33. Promise.all用过吗？怎么实现？和promise.any以及promise.race的区别，怎样实现promise.allSettled？怎样实现⼀组promise的链式调用？怎样让⼀组promise同步执行？除了promise有什么其它解决异步的方式

Promise.any() ,只要其中的一个 promise 成功，就返回那个已经成功的 promise 。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise 和AggregateError类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和Promise.all()是相反的。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any。  

promise.race(),有一个实例率先改变状态

Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。  

Promise.all()  都变成fulfilled，状态才会变成fulfilled,有一个被rejected，状态就变成rejected

除了promise有什么其它解决异步的方式：https://blog.csdn.net/howgod/article/details/93978297  

### 34. Async函数用过吗，有看过babel编译后的ES5代码吗

async/await语法糖就是使用Generator函数+自动执行器来运作的。  

```js
// 定义了一个promise，用来模拟异步请求，作用是传入参数++
function getNum(num){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num+1)
        }, 1000)
    })
}

//自动执行器，如果一个Generator函数没有执行完，则递归调用
function asyncFun(func){
  var gen = func();

  function next(data){
    var result = gen.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

// 所需要执行的Generator函数，内部的数据在执行完成一步的promise之后，再调用下一步
var func = function* (){
  var f1 = yield getNum(1);
  var f2 = yield getNum(f1);
  console.log(f2) ;
};
asyncFun(func);
```

### 35. 字符串拼接的性能问题

由于String对象时不可变对象，因此在需要对字符串进行修改操作时（如字符串连接和替换），String对象总是会生成新的对象，所以其性能相对较差。  

### 36. 对数字进行处理，千分位分割

参考： https://www.cnblogs.com/leftJS/p/11074694.html  

### 37. 求dom的层级深度

```js
// 求dom树的最大深度
const getDepth = (node) => {
  // childNodes 它会把空的文本节点当成节点，
  // children只显示元素节点即使是非空的文字节点也不显示。
  if (!node.children || node.children.length === 0) {
    return 1;
  }
  const maxChildrenDepth = [...node.children].map((v) => getDepth(v));
  return 1 + Math.max(...maxChildrenDepth);
};
```

### 38. 哪些是类数组，怎么区分是类数组？

input的文件对象FileList，arguments NodeList HTMLCollection  

《javascript权威指南》上给出了代码用来判断一个对象是否属于“类数组”。

```js
function isArrayLike(o) {   
    if (o &&                                // o is not null, undefined, etc.
            typeof o === 'object' &&            // o is an object
            isFinite(o.length) &&               // o.length is a finite number
            o.length >= 0 &&                    // o.length is non-negative
            o.length===Math.floor(o.length) &&  // o.length is an integer
            o.length < 4294967296)              // o.length < 2^32
            return true;                        // Then o is array-like
    else
            return false;                       // Otherwise it is not
}
```

### 39. ts T

一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了类型变量，它是一种特殊的变量，只用于表示类型而不是值。

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

### 40. 实现isArray函数

```js
// MDN Polyfill
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```
