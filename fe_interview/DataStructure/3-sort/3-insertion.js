function insertSort(arr) {
  let current, preIndex;
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    // 当前元素的前一个元素下标
    preIndex = i - 1;
    // 将需要排序的元素用current保存起来以免因下面下标变化而取错值
    current = arr[i];
    // 开始内部循环将第一个值开始排序,终止条件为当前元素下标大于数组的第0位,并且当前元素大于前一个元素,否则的话将前一个元素赋值给当前元素（arr[preIndex+1]）
    // 然后将前一个元素下标-1 继续向前比较
    while (preIndex >= 0 && current < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    // 当current大于前一个元素时 把保存起来的current赋值给arr[preIndex]
    arr[preIndex + 1] = current;
  }
  return arr;
}

const arr = [1, 4, 2, 5, 7, 10, 5, 2];
console.log(insertSort(arr)); // [1, 2, 2, 4, 5, 5, 7, 10]
