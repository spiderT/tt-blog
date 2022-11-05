function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      //相邻元素两两对比
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
}

const arr = [1, 4, 2, 5, 7, 10, 5, 2];
console.log(bubbleSort(arr));  // [1, 2, 2, 4, 5, 5, 7, 10]
