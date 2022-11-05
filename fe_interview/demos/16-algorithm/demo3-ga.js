// 最少硬币找零
function minCoinChange(coins, amount) {
  const change = [];
  let total = 0;
  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];
    while (total + coin <= amount) {
      change.push(coin);
      total += coin;
    }
  }
  return change;
}

// const result = minCoinChange([1, 5, 10, 25], 36);
// console.log(result); // [ 25, 10, 1 ]
const result = minCoinChange([1, 2, 5, 9, 10], 18);
console.log(result); // [ 10, 5, 2, 1 ]

// 背包问题
function knapSack(capacity, weights, values) {
  const n = values.length;
  let load = 0;
  let val = 0;
  for (let i = 0; i < n && load < capacity; i++) {
    if (weights[i] <= capacity - load) {
      val += values[i];
      load += weights[i];
      console.log(`物品${i + 1}，重量：${weights[i]}，价值：${values[i]}`);
    } else {
      const r = (capacity - load) / weights[i];
      val += r * values[i];
      load += weights[i];
      console.log(`物品${i + 1}的${r}，重量：${r * weights[i]}，价值：${val}`);
    }
  }

  return val;
}

const capacity = 6;
const weights = [2, 3, 4];
const values = [3, 4, 5];
console.log(knapSack(capacity, weights, values));

// 最长公共子序列（LCS）
function lcs(wordX, wordY, m = wordX.length, n = wordY.length) {
  if (m === 0 || n === 0) {
    return 0;
  }
  if (wordX[m - 1] === wordY[n - 1]) {
    return 1 + lcs(wordX, wordY, m - 1, n - 1);
  }
  const a = lcs(wordX, wordY, m, n - 1);
  const b = lcs(wordX, wordY, m - 1, n);
  return a > b ? a : b;
}

const wordX = ["a", "c", "b", "a", "e", "d"];
const wordY = ["a", "b", "c", "a", "d", "f"];
console.log(lcs(wordX, wordY)); // 4
