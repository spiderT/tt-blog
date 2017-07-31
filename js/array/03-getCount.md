## 数组

### 3. 求一个数组元素出现的次数

1) 基础方法

```js
function getCount(arr, el) {
    let num = 0;
    for (let k in arr) {
        if (el === arr[k]) {
            num++;
        }
    }
    return num;
}
```

