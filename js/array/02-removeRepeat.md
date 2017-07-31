## 数组

### 2. 数组元素去重

1) 基础方法

```js
function removeRepeat(arr) {
    let newArr = [];
    for (let k in arr) {
        if (newArr.indexOf(arr[k]) === -1) {
            newArr.push(arr[k]);
        }
    }
    return newArr;
}
```

2) 先排序再去重,检查原数组中的第i个元素与结果数组中的最后一个元素是否相同

```js
function removeRepeat(arr){
    arr.sort();
    let newArr = [arr[0]];
    for(let k in arr){
        if(arr[k]!=newArr[newArr.length-1]){
            newArr.push(arr[k]);
        }
    }
    return newArr;
}
```

3) ES6方法

```js
function removeRepeat(arr) {
    return Array.from(new Set(arr));
}
```
