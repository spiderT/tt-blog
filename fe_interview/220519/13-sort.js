// https://segmentfault.com/a/1190000041876344
// https://www.cnblogs.com/AlbertP/p/10847627.html

// 堆排序
// 通过构建大顶堆
// 将堆顶的最大数拿出，与堆底的叶子节点进行交换
// 接着，树剪掉最大数的叶子
// 再对堆进行调整，重新变成大顶堆
// 返回步骤2，以此循环，直至取出所有数

// 树的最后一个非叶子节点：(arr.length / 2) - 1
// 非叶子节点i的左叶子节点： i*2+1
// 非叶子节点i的右叶子节点： i*2+2

function sort(arr) {
  var len; //因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

  function buildMaxHeap(arr) {
    //建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len / 2); i >= 0; i--) {
      heapify(arr, i);
    }
  }

  function heapify(arr, i) {
    //堆调整
    var left = 2 * i + 1,
      right = 2 * i + 2,
      largest = i;

    if (left < len && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest != i) {
      swap(arr, i, largest);
      heapify(arr, largest);
    }
  }

  function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  buildMaxHeap(arr);

  for (var i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    len--;
    heapify(arr, 0);
  }
  return arr;
}

const arr = [5, 3, 2, 1, 4, 6, 8, 3, 5, 6, 7, 2];

const res = sort(arr);

console.log("res", res);
