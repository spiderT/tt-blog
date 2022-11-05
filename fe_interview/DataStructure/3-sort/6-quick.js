function swap(A, i, j) {
  [A[i], A[j]] = [A[j], A[i]];
}

/**
 *
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
function divide(A, p, r) {
  // 基准点
  const x = A[r - 1];
  // i初始化是-1，也就是起始下标的前一个
  let i = p - 1;
  for (let j = p; j < r - 1; j++) {
    // 如果比基准点小就i++，然后交换元素位置
    if (A[j] <= x) {
      i++;
      swap(A, i, j);
    }
  }
  // 最后将基准点插入到i+1的位置
  swap(A, i + 1, r - 1);
  // 返回最终指针i的位置
  return i + 1;
}

/**
 * 主程序主要是通过递归去重复的调用进行拆分，一直拆分到只有一个数字。
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
function quickSort(A, p = 0, r) {
  r = r || A.length;
  if (p < r - 1) {
    const q = divide(A, p, r);
    quickSort(A, p, q);
    quickSort(A, q + 1, r);
  }
  return A;
}

const arr = [1, 4, 2, 5, 7, 10, 5, 2];
console.log(quickSort(arr)); // [1, 2, 2, 4, 5, 5, 7, 10]
