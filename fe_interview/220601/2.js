// 如何在不使用递归的情况下实现如下转换：
// 将 [1, [2, 3], [4, [5, 6], 7], 8] => [1, 2, 3, 4, 5, 6, 7, 8]
// 将 [1, [2, 3], [4, [5, 6], 7], 8] => [1, 8, 2, 3, 4, 7, 5, 6]

let arr = [1, [2, 3], [4, [5, 6], 7], 8];

// function flatten(arr) {
//   while (arr.some((i) => Array.isArray(i))) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }

function flatten(arr) {
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 反转恢复原数组的顺序
  return res.reverse();
}

const breadth = (arr) => {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const next = stack.shift();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  return result;
};
console.log(breadth(arr)); //  [1, 8, 2, 3, 4, 7, 5, 6]
