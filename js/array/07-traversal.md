## 数组

### 7. 数组的遍历

1) 普通for循环

```js
for (let i = 0; i < arr.length; i++) {
    
}
```

2) 优化版for循环——使用临时变量，将长度缓存起来，避免重复获取数组长度，当数组较大时优化效果才会比较明显。
这种方法基本上是所有循环遍历方法中性能最高的一种。

```js
for (let i = 0, len = arr.length; i < len; i++) {
    
}
```

3) forEach——性能比普通for循环弱

```js
arr.forEach((val,index) => {
    
})
```

4) forEach的变种——主要处理类似数组的对象(如NodeList)，实际性能要比普通foreach弱

```js
Array.prototype.forEach.call(arr,(el) => {
    
})
```

5) for in 循环——效率是最低的

```js
for(let k in arr){
    //k 是 index
}
```

6) map循环——效率比不上foreach

```js
arr.map((val,index) => {
    
})
```

7) for of循环——ES6，性能要好于for in，但仍然比不上普通for循环

```js
for(let val of arr){
    console.log(val);
}
```

8) every——对数组中的每一项运行指定函数，如果该函数对每一项返回true,则返回true，否则false

```js
arr.every((val, index, array) => {
    
})
```

9) some——对数组中每一项运行指定函数，如果该函数对任一项返回true，则返回true，否则false

```js
arr.some((val, index, array) => {
    
})
```