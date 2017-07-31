## 数组

### 5. 数组的深拷贝

1) concat方法

```js
function deepClone(arr) {
    return arr.concat();
}
```

2) slice方法

```js
function deepClone(arr) {
    return arr.slice(0);
}
```

3) Array.of()方法

```js
function deepClone(arr) {
    return Array.of(...arr);
}
```
4) for循环

```js
function deepClone(arr) {
    let newArr = [];
    for (let k in arr) {
        newArr.push(arr[k]);
    }
    return newArr;
}
```

5) ES6方法

```js
function deepClone(arr) {
    let newArr = [];
    newArr.push(...arr);
    return newArr;
}
```




