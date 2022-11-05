# 前端工程化

- [前端工程化](#前端工程化)
  - [1. webpack的构建流程](#1-webpack的构建流程)
  - [2. webpack，rollup，Parcel的相同点和不同点](#2-webpackrollupparcel的相同点和不同点)
  - [3. loader，常用loader，loader的思路](#3-loader常用loaderloader的思路)
  - [4. plugin，常用plugin，plugin的思路](#4-plugin常用pluginplugin的思路)
  - [5. webpack热更新是如何实现的 webpack-dev-server  HMR](#5-webpack热更新是如何实现的-webpack-dev-server--hmr)
  - [6. webpack层面如何做性能优化](#6-webpack层面如何做性能优化)
  - [7. webpack dll](#7-webpack-dll)
  - [8. Webpack Code Splitting](#8-webpack-code-splitting)
  - [9. Webpack tree-shaking](#9-webpack-tree-shaking)
  - [10. webpack scope hosting](#10-webpack-scope-hosting)
  - [11. Babel](#11-babel)
  - [12. 模版引擎](#12-模版引擎)
  - [13. 前端发布](#13-前端发布)
  - [14. webpack source-map原理](#14-webpack-source-map原理)
  - [15. Webpack构建速度优化](#15-webpack构建速度优化)
  - [面试题](#面试题)
    - [1. yarn和npm的区别](#1-yarn和npm的区别)
    - [2. webpack 按需加载](#2-webpack-按需加载)
    - [3. Node 的 SSR 是否有做过，怎么做的？](#3-node-的-ssr-是否有做过怎么做的)

## 1. webpack的构建流程

参考：https://mp.weixin.qq.com/s?__biz=MzI0MTUxOTE5NQ==&mid=2247484030&idx=1&sn=d630d4b3995bbfd50f99e781074acfeb
https://ssshooter.com/2019-02-19-webpack-bootstrap/  

Commonjs/ES6 module 原理：https://github.com/muwoo/blogs/issues/28  

## 2. webpack，rollup，Parcel的相同点和不同点

## 3. loader，常用loader，loader的思路

babel-loader  
url-loader  
css-loader  

## 4. plugin，常用plugin，plugin的思路

html-webpack-plugin  
clean-webpack-plugin  
mini-css-extract-plugin  
CommonsChunkPlugin  
SplitChunksPlugin  

## 5. webpack热更新是如何实现的 webpack-dev-server  HMR

## 6. webpack层面如何做性能优化

## 7. webpack dll

## 8. Webpack Code Splitting

参考资料：https://segmentfault.com/a/1190000013000463  
https://juejin.cn/post/6844903922117820423  

把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。  

有三种常用的代码分离方法：

1. 入口起点：使用 entry 配置手动地分离代码。
2. 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。

## 9. Webpack tree-shaking

参考资料：[Tree-Shaking性能优化实践 - 原理篇](https://juejin.cn/post/6844903544756109319)  

1. ES6的模块引入是静态分析的，故而可以在编译时正确判断到底加载了什么代码。
2. 分析程序流，判断哪些变量未被使用、引用，进而删除此代码

「副作用」的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。  

如果你的代码确实有一些副作用，那么可以改为提供一个数组：

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}
```

## 10. webpack scope hosting

## 11. Babel

## 12. 模版引擎

## 13. 前端发布

## 14. webpack source-map原理

## 15. Webpack构建速度优化

参考： https://segmentfault.com/a/1190000018493260  

## 面试题

### 1. yarn和npm的区别

参考：https://www.jianshu.com/p/254794d5e741  

### 2. webpack 按需加载

### 3. Node 的 SSR 是否有做过，怎么做的？

https://zhuanlan.zhihu.com/p/133702787  
