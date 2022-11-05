# reduce

- [reduce](#reduce)
  - [1. 代替reverse](#1-代替reverse)
  - [2. 数组分割](#2-数组分割)
  - [3. 数组过滤](#3-数组过滤)
  - [4. 数组填充](#4-数组填充)
  - [5. 数组扁平](#5-数组扁平)
  - [6. 数组成员独立拆解](#6-数组成员独立拆解)
  - [7. 数组成员个数统计](#7-数组成员个数统计)
  - [8. 数组成员位置记录](#8-数组成员位置记录)
  - [9. 数组成员特性分组](#9-数组成员特性分组)
  - [10. 数组成员所含关键字统计](#10-数组成员所含关键字统计)
  - [11. 数字千分化](#11-数字千分化)
  - [12. 斐波那契数列](#12-斐波那契数列)
  - [13. 返回对象指定键值](#13-返回对象指定键值)
  - [14. 数组转对象](#14-数组转对象)
  - [15. Redux Compose函数原理](#15-redux-compose函数原理)

本文借鉴了[25个你不得不知道的数组reduce高级用法](https://juejin.cn/post/6844904063729926152)

[MDN reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)，reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行,reduceRight()从右到左)，将其结果汇总为单个返回值。  

- 语法  

```text
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])  
```

- 形式：

```js
array.reduce((t, v, i, a) => {}, initValue)
```

- 参数:

  + callback执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：

  1. accumulator累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。
  2. currentValue数组中正在处理的元素。
  3. index 可选 数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
  4. array 可选 调用reduce()的数组  

  + initialValue  可选  作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。  

- 返回值: 函数累计处理的结果  

- 过程
  
1. 以t作为累计结果的初始值，不设置t则以数组第一个元素为初始值
2. 开始遍历，使用累计器处理v，将v的映射结果累计到t上，结束此次循环，返回t
3. 进入下一次循环，重复上述操作，直至数组最后一个元素
4. 结束遍历，返回最终的t

## 1. 代替reverse

demo路径：reduceDemos/demo1.js  

```js
function Reverse(arr = []) {
    return arr.reduceRight((t, v) => (t.push(v), t), []);
}
```

## 2. 数组分割

demo路径：reduceDemos/demo2.js  

```js
function Chunk(arr = [], size = 1) {
    return arr.length ? arr.reduce((t, v) => (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t), [[]]) : [];
}
```

## 3. 数组过滤

demo路径：reduceDemos/demo3.js  

```js
function Difference(arr = [], oarr = []) {
  return arr.reduce((t, v) => (!oarr.includes(v) && t.push(v), t), []);
}
```

## 4. 数组填充

demo路径：reduceDemos/demo4.js  

```js
function Fill(arr = [], val = "", start = 0, end = arr.length) {
  if (start < 0 || start >= end || end > arr.length) return arr;
  return [
    ...arr.slice(0, start),
    ...arr.slice(start, end).reduce((t, v) => (t.push(val || v), t), []),
    ...arr.slice(end, arr.length),
  ];
}
```

## 5. 数组扁平

demo路径：reduceDemos/demo5.js  

```js
function Flat(arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), []);
}
```

## 6. 数组成员独立拆解

demo路径：reduceDemos/demo6.js  

```js
function Unzip(arr = []) {
  return arr.reduce(
    (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
    Array.from({ length: Math.max(...arr.map((v) => v.length)) }).map((v) => [])
  );
}
```

## 7. 数组成员个数统计

demo路径：reduceDemos/demo7.js  

```js
function Count(arr = []) {
  return arr.reduce((t, v) => ((t[v] = (t[v] || 0) + 1), t), {});
}
```

## 8. 数组成员位置记录

demo路径：reduceDemos/demo8.js  

```js
function Position(arr = [], val) {
  return arr.reduce((t, v, i) => (v === val && t.push(i), t), []);
}
```

## 9. 数组成员特性分组

demo路径：reduceDemos/demo9.js  

```js
function Group(arr = [], key) {
  return key
    ? arr.reduce(
        (t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t),
        {}
      )
    : {};
}
```

## 10. 数组成员所含关键字统计

demo路径：reduceDemos/demo10.js  

```js
function Keyword(arr = [], keys = []) {
  return keys.reduce(
    (t, v) => (arr.some((w) => w.includes(v)) && t.push(v), t),
    []
  );
}
```

## 11. 数字千分化

demo路径：reduceDemos/demo11.js  

```js
function ThousandNum(num = 0) {
  const str = (+num).toString().split(".");
  const int = (nums) =>
    nums
      .split("")
      .reverse()
      .reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), "")
      .replace(/^,|,$/g, "");
  const dec = (nums) =>
    nums
      .split("")
      .reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), "")
      .replace(/^,|,$/g, "");
  return str.length > 1 ? `${int(str[0])}.${dec(str[1])}` : int(str[0]);
}
```

## 12. 斐波那契数列

demo路径：reduceDemos/demo12.js  

```js
function Fibonacci(len = 2) {
  const arr = [...new Array(len).keys()];
  return arr.reduce((t, v, i) => (i > 1 && t.push(t[i - 1] + t[i - 2]), t), [
    0,
    1,
  ]);
}
```

## 13. 返回对象指定键值

demo路径：reduceDemos/demo13.js  

```js
function GetKeys(obj = {}, keys = []) {
  return Object.keys(obj).reduce(
    (t, v) => (keys.includes(v) && (t[v] = obj[v]), t),
    {}
  );
}
```

## 14. 数组转对象

demo路径：reduceDemos/demo14.js  

```js
const people = [
    { area: "GZ", name: "YZW", age: 27 },
    { area: "SZ", name: "TYJ", age: 25 }
];
const map = people.reduce((t, v) => {
    const { name, ...rest } = v;
    t[name] = rest;
    return t;
}, {}); // { YZW: {…}, TYJ: {…} }
```

## 15. Redux Compose函数原理

demo路径：reduceDemos/demo15.js  

```js
function Compose(...funs) {
  if (funs.length === 0) {
    return (arg) => arg;
  }
  if (funs.length === 1) {
    return funs[0];
  }
  return funs.reduce((t, v) => (...arg) => t(v(...arg)));
}
```
