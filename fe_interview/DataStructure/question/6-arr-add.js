// 给一个数组（其元素不重复），求所有元素相加为某个值的2个元素对的下标对
// eg: [2, 9, 3, 10, 8, 1, 22] 目标值11，有[[0, 1], [2, 4], [3, 5]]

// 将数组排序，然后定义两个指针，一个指针i从左向右，另一个从j右向左。
// ①如果data[i]+data[j] < tager ,则++i
// ②如果data[i]+data[j] > tager ,则–j
// ③如果data[i]+data[j] > tager ,则就找到
// 由于排序的最佳时间复杂度为O(nlogn)，两个指针的遍历时间复杂度为O(n)。所以总的时间复杂度为O(nlogn)
function f(arr, target) {
  const a = arr.slice().sort((a, b) => a - b);
  const len = a.length;
  const key = []; //存放最后的元素组
  const val = []; //存放最后的下标组
  if (len <= 1) return;
  let i = 0;
  let j = len - 1;
  while (i < j) {
    if (a[i] + a[j] < target) {
      i++;
    } else if (a[i] + a[j] > target) {
      j--;
    } else {
      val.push([a[i], a[j]]);
      key.push([i, j]);
      i++;
      j--;
    }
  }
  // 如果只要下标组，则：return key;
  return {
    key,
    val,
  };
}

function findNum2(arr, target) {
  const len = arr.length;
  const key = []; //存放最后的元素组
  const val = []; //存放最后的下标组
  if (len <= 1) return;
  for (let i = 0; i < len; i++) {
    const diff = target - arr[i];
    // 从i+1开始查询是否存在diff的值（下标）
    const index = arr.slice(i + 1).findIndex((i) => i === diff);
    if (index !== -1) {
      key.push([i, i + 1 + index]);
      val.push([arr[i], arr[i + 1 + index]]);
    }
  }
  // 如果只要下标组，则：return key;
  return {
    key,
    val,
  };
}

// 下面是测试
const arr = [2, 9, 3, 10, 8, 1, 22];
const target = 11;
console.log(f(arr, target));
// {
//     key: [ [ 0, 5 ], [ 1, 4 ], [ 2, 3 ] ], // key 不对
//     val: [ [ 1, 10 ], [ 2, 9 ], [ 3, 8 ] ]
// }
console.log(findNum2(arr, target));
// {
//     key: [ [ 0, 1 ], [ 2, 4 ], [ 3, 5 ] ],
//     val: [ [ 2, 9 ], [ 3, 8 ], [ 10, 1 ] ]
//  }