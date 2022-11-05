function shellSort(arr) {
  const len = arr.length;
  let temp,
    gap = 1;
  while (gap < len / 3) {
    //动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      for (let j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
}
const arr = [1, 4, 2, 5, 7, 10, 5, 2];
console.log(shellSort(arr)); // [1, 2, 2, 4, 5, 5, 7, 10]
