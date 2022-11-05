# 前端总结

持续更新中......

## JS/TS

1. 事件机制/Event Loop（进程，线程，协程，宏任务，微任务）
2. 执行上下文/作用域链/闭包
3. 原型/继承
4. this/call/apply/bind/new
5. 手写 Promise, Promise.all, Promise.race
6. 手写async await
7. 深浅拷贝
8. 函数式编程
9. Service Worker
10. Web Worker
11. ES6、ES7、ES8
12. TypeScript相比js的优势
13. TypeScript泛型
14. interface
15. TypeScript是如何编译的
16. namespace和module
17. 如何编写一个d.ts文件

面试题  

1. 手动实现防抖debounce、节流throttle
2. node require 和 import 的区别
3. arguments 是数组吗？如果不是，怎么转换成数组？
4. 实现一个 add 方法，使计算结果能够满足如下预期： add(1)(2)(3) () add(1, 2, 3)(4)()
5. 手写EventEmitter
6. 关于异步任务执行的题目，涉及主线程任务、宏任务、微任务
7. 变量提升，函数内 var 和 let 声明的执行结果各怎样
8. 场景：从 1-10，按顺序每秒输出一个数字
9. 浏览器是单进程吗？进行和线程的区别？
10. 惰性求值
11. ts class 里面怎么实现一个 runtime 里面访问不到 private 的属性
12. 闭包的变量内存怎么分布的
13. 协程与同步异步
14. 什么时候传值，什么时候传变量
15. promise 是如何实现链式调用的，为什么每次返回新 Promise, 像 jquery 那样直接返回 this 不行吗?
16. 顺序延时输出数组里的每一项
17. 在哪些情况下一个元素绑定的点击事件不会被触发
18. 写了一个数据去重的算法
19. 柯里化操作编程
20. 页面中某个请求特别慢可能原因定位
21. 如何采集错误
22. 如何解决 window.onerror 监听跨 iframe 错误?
23. async & defer
24. 前端异步流的题:修改 Scheduler 类 add 方法，维护最大并发为两个
25. 原型链实现对象的继承
26. 上传文件的方法
27. JS中函数参数值传递和引用传递
28. 8.Instanceof的原理，如何实现
29. 图片懒加载的方式
30. 数组flat方法，以及参数
31. This作用域
32. 判断变量的类型的方法
33. Promise.all用过吗？怎么实现？和promise.any以及promise.race的区别，怎样实现promise.allSettled？怎样实现⼀组promise的链式调用？怎样让⼀组promise同步执行？除了promise有什么其它解决异步的方式
34. Async函数用过吗，有看过babel编译后的ES5代码吗
35. 字符串拼接的性能问题
36. 对数字进行处理，千分位分割
37. 求dom的层级深度
38. 哪些是类数组，怎么区分是类数组？
39. ts T
40. 实现isArray函数

[JS解析](./JS.md)  
[TS解析](./TypeScript.md)  

## HTML&CSS

1. BFC
2. flex布局
3. grid布局
4. css 3D 加速
5. css伪类和伪元素
6. 浏览器的绘制原理，浏览器重绘(Repaint)和回流(Reflow重排)

面试题

1. css 垂直居中
2. css 的 10px 字体无法显示的解决方案
3. 多行省略
4. 自适应 search 框; input + button 布局
5. 移动端开发和 pc 端开发的不同之处
6. 移动端适配方案，rem 计算相对哪个元素的 fontsize
7. Html meta 标签介绍，和性能相关的标签
8. CSS 画三角形
9. 平行四边形

[HTML&CSS解析](./CSS.md)

## React

1. react 的 diff 算法，key 的作用
2. MVVM原理（实现简易MVVM）
3. 虚拟 dom 的好处
4. 比较 vue 和 react ， React 代码与 Vue 代码互转和复用
5. mobx，redux 的优缺点
6. react 中 render props 适用场景（类组件和函数组件的区别, render props 和 HOC 优缺点）
7. hooks: useState, useEffect, useCallback，useMemo
8. react setState 什么时候同步什么时候异步
9. 请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式，例如下面的例子
10. react 生命周期
11. react-router
12. 组件通信

面试题

1. react 原理
2. 手写双向绑定实现，两种
3. react 常用的优化项
4. react 16/17 的新特性
5. 两个同级的 react 组件如何通信
6. constructor 和 componentdidMount 的区别 为什么请求不能放在 constructor 里面
7. React hook底层优化原理，为什么会有hooks，react hooks里的useCallback了解吗
8. react fiber
9. react的context原理
10. redux的架构，dispach的是什么概念，redux-thunk
11. redux和mobx
12. immutable
13. Redux中间件原理

[React解析](./React.md)

## 网络

1. TCP/UDP
2. TLS/SSL
3. HTTP1.1
4. HTTP2
5. HTTP3
6. HTTPS
7. 浏览器缓存
8. DNS
9. CDN

面试题

1. HTTPS 和 HTTP 的区别
2. 从输入URL，到页面展示发生了什么
3. TCP的3次握手和4次挥手
4. 请求头有哪些信息？各自的作用是什么？
5. xss、xsrf 防御手段
6. http和websocket的联系和区别

[网络解析](./Network.md)

## 数据结构与算法

1. 用js 实现栈，队列，链表
2. 树, 红黑树
3. 常见排序算法的思路和复杂度
4. 二叉树前序/中序/后序遍历
5. 深度优先/广度优先
6. 动态规划

面试题

1. 递归, 尾递归优化
2. 链表排序(JS合并两个排序的链表)
3. 冒泡、 选择、插入、快排
4. 写版本号排序的代码（及优化），时间复杂度
5. 动态规划求解最多有几种方案求解硬币找零问题
6. 给了一个数组求两数相加和等于 m 总共有多少种可能性
7. 请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数控制请求的并发度，当所有请求结束之后，需要执行 callback 函数。发请求的函数可以直接使用 fetch 即可
8. [-1,-2,8,9,-10] 求最大子段和
9. 链表环检测
10. 一个完全二叉树，全部是大于 0 的整数，给出一个整数N，问从二叉树的根部开始向下，存不存在一个路径，使路径上所有的点的和是 N
11. N 级台阶，一次只能跳 3 级 4 级或者 5 级，请问一种有多少种跳法
12. 算法题，给一个字符串，给出该字符串字符的所有排列组合方式
13. 一个数组，里面有 N 个整数不重复，求这个 N 个整数中缺少的最小正整数，要 求时间复杂度是 O(n)
14. 1000 万 ip 地址，设计一个系统最快的查出某个 ip 地址在不在其中
15. hashMap 的实现原理
16. 算法: 回文数字判断,要尽可能高效的算法
17. 手写数组去重
18. 大数相乘
19. 判断对称二叉树
20. 从数组里获取是哪个乘积最大的三个数
21. 数组的最大子序和
22. 实现koa洋葱模型
23. js 求开方
24. js 构建二叉树数据结构并实现翻转操作

[数据结构与算法解析](./DataStructure.md)

## 设计模式

1. 常用设计模式，以及应用场景
2. vue/react中应用什么设计模式

[设计模式解析](./DesignPatterns.md)

## 工程化

1. webpack的构建流程
2. webpack，rollup，Parcel的相同点和不同点
3. loader，常用loader，loader的思路
4. plugin，常用plugin，plugin的思路
5. webpack热更新是如何实现的 webpack-dev-server HMR
6. webpack层面如何做性能优化
7. webpack dll
8. Webpack Code Splitting
9. Webpack tree-shaking
10. webpack scope hosting
11. Babel
12. 模版引擎
13. 前端发布
14. webpack source-map原理
15. Webpack构建速度优化

面试题

1. yarn和npm的区别
2. webpack 按需加载
3. Node 的 SSR 是否有做过，怎么做的？

[工程化解析](./Engineer.md)

## 安全

1. XSS
2. CSRF
3. HTTPS原理
4. 浏览器安全策略
5. 代码保护

[安全解析](./Security.md)

## Node

1. Node多线程
2. Node.js 进程与线程
3. Node.js RPC
4. 浏览器与Node的事件循环(Event Loop)有何区别

面试题

1. node 开发，登陆机制的实现，性能调试，监控

[Node解析](./Node.md)
