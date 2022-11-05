var len;
function buildMaxHeap(arr) {
  //建堆
  len = arr.length;
  // [n/2-1]表示的是最后一个有子节点 (本来是n/2（堆从1数起），但是这里arr索引是从0开始，所以-1)
  for (var i = Math.floor(len / 2) - 1; i >= 0; i--) {
    maxHeapify(arr, i);
  }
  //对每一个节点（非叶节点），做堆调整
}
function maxHeapify(arr, i) {
  //堆调整
  var left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i; //i为该子树的根节点

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    //即上面的if中有一个生效了
    swap(arr, i, largest); //交换最大的为父节点
    maxHeapify(arr, largest); //交换后，原值arr[i]（往下降了）（索引保存为largest），
    //作为根时，子节点可能比它大，因此要继续调整
  }
}
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function heapSort(arr) {
  buildMaxHeap(arr);
  for (var i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    len--;
    maxHeapify(arr, 0);
  }
  return arr;
}
