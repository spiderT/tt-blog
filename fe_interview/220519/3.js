// 完全平方数
// 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。

// 输入: n = 12
// 输出: 3
// 解释: 12 = 4 + 4 + 4.


// ?? 

var numSquares = function (n) {
  let map = new Map();
  let queue = [];
  queue.push([n, 0]);
  map.set(n, true);
  while (queue.length) {
    let [num, step] = queue.shift();
    for (let i = 1; ; i++) {
      let nextNum = num - i * i;
      if (nextNum < 0) break;
      if (nextNum == 0) {
        console.log("num-->", num, 'i-->', i);
        return step + 1;
      }
      // nextNum 未被访问过
      if (!map.get(nextNum)) {
        queue.push([nextNum, step + 1]);
        // 标记已经访问过
        map.set(nextNum, true);
      }
    }
  }
};

console.log(numSquares(22)); // 3
