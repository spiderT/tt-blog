## 数组

### 6. 数组的排序(以升序为例)

1) 快速排序,递归思想

```js
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let middleIndex = Math.floor(arr.length / 2);
    let middle = arr.splice(middleIndex, 1)[0];
    let left = [];
    let right = [];
    for (let k in arr) {
        if (arr[k] < middle) {
            left.push(arr[k]);
        } else {
            right.push(arr[k]);
        }
    }
    return quickSort(left).concat(middle, quickSort(right));
}
```
2) 冒泡排序

```js
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if(arr[j] > arr[j+1]){
                let tmp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}
```

3) 插入排序——将一个记录插入到已经排好序的有序表中，从而得到一个新的、记录数增1的有序表 

```js
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}
```

4) 选择排序——将当前未确定的min或者max取出来插到最前面或者后面

```js
function selectSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            if (min > arr[j]) {
                let temp = min;
                min = arr[j];
                arr[j] = temp;
            }
        }
        arr[i] = min;
    }
    return arr;
}
```

5) 希尔排序——实质是分组插入排序，该方法又称缩小增量排序

```js
function shellSort(arr) {
    let increment = arr.length;
    do {
        increment = Math.floor(increment / 3) + 1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < arr[i - increment]) {
                let temp = arr[i];
                for (var  j = i - increment; j >= 0 && temp < arr[j]; j -= increment) {
                    arr[j + increment] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    } while (increment > 1)
    {
        return arr;
    }
}
```

6) 二分插入排序

```js
function binaryInsertSort(arr){
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i], left = 0, right = i - 1;
        while (left <= right) {
            let middle = parseInt((left + right) / 2);
            if (key < arr[middle]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
        for (let j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }
        arr[left] = key;
    }
    return arr;
}
```