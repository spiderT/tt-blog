// 假设给出的不同面额的硬币是[1, 2, 5]，目标是 120，问最少需要的硬币个数？
// https://leetcode-cn.com/problems/coin-change/solution/js-xiang-jie-dong-tai-gui-hua-de-si-xiang-yi-bu-da/

// dp[120] = Math.min(dp[119] + 1, dp[118] + 1, dp[115] + 1);
// - 推导出「状态转移方程」：
// dp[i] = Math.min(dp[i - coin] + 1, dp[i - coin] + 1, ...)
// 其中 coin 有多少种可能，我们就需要比较多少次，那么我们到底需要比较多少次呢？
// 当然是 coins 数组中有几种不同面值的硬币，就是多少次了~ 遍历 coins 数组，

const coinChange = (coins, amount) => {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  // console.log('dp', dp);
  return dp[amount] === Infinity ? -1 : dp[amount];
};

const coins = [1, 2, 5, 6];
const amount = 23;

const value = coinChange(coins, amount);

console.log("value", value); // 4: 6+6+6+5












const getCoinChange = (coins, amount) => {
  const arr = new Array(amount + 1).fill(Infinity);
  arr[0] = 0;

  for (const coin of coins) {
    for (let i = coin; i < amount; i++) {
      arr[i] = Math.min(arr[i], arr[i - coin] + 1);
    }
  }
  return arr[amount] === Infinity ? -1 : arr[amount];
};
