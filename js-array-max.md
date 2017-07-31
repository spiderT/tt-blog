## 数组

### 1. 求数组最大值

1) 基础方法

```js
function getMax(arr) {
    let max = arr[0];
    for(let k in arr){
        if(max < arr[k]){
            max = arr [k];
        }
    }
    return max;
}
```

2) 原型方法

```js
function getMax(arr) {
    return Math.max.apply(null,arr)
}
```

3) ES6方法

```js
function getMax(arr) {
    return Math.max(...arr);
}
```
