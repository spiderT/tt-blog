// 优先队列应用
// 前 K 个高频元素
// 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

// 示例:

// 输入: nums = [1,1,1,2,2,3], k = 2
// 输出: [1,2]

// 实现优先队列
function compare(a, b) {
  return a - b > 0;
}
class PriorityQueue {
  // max 为优先队列的容量
  constructor(max, compare) {
    this.max = max;
    this.compare = compare;
    this.maxHeap = new MaxHeap([], compare);
  }

  getSize() {
    return this.maxHeap.getSize();
  }

  isEmpty() {
    return this.maxHeap.isEmpty();
  }

  getFront() {
    return this.maxHeap.findMax();
  }

  enqueue(e) {
    // 比当前最高的优先级的还要高，直接不处理
    if (this.getSize() === this.max) {
      if (this.compare(e, this.getFront())) return;
      this.dequeue();
    }
    return this.maxHeap.add(e);
  }

  dequeue() {
    if (this.getSize() === 0) return null;
    return this.maxHeap.extractMax();
  }
}

var topKFrequent = function (nums, k) {
  let map = {};
  let pq = new PriorityQueue(k, (a, b) => map[a] - map[b] < 0);
  for (let i = 0; i < nums.length; i++) {
    if (!map[nums[i]]) map[nums[i]] = 1;
    else map[nums[i]] = map[[nums[i]]] + 1;
  }
  let arr = Array.from(new Set(nums));
  for (let i = 0; i < arr.length; i++) {
    pq.enqueue(arr[i]);
  }
  return pq.maxHeap.data;
};

const nums = [1, 1, 1, 2, 2, 3],
  k = 2;

const res = topKFrequent(nums, k);

console.log("res", res);
