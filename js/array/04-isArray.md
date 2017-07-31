## 数组

### 4. 检测是数组的方法

1) instanceof判断

```js
function isArray(arr) {
    return arr instanceof Array;
}
```

2) Array.isArray()判断

```js
function isArray(arr) {
    return Array.isArray(arr);
}
```

3) 原型链方法

```js
function isArray(arr) {
    return arr.constructor === Array;
}
```
4）Object.prototype.toString方法

```js
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
```


