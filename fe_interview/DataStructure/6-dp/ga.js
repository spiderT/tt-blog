// 最少硬币找零 - 贪心算法
// 贪心算法的基本思路是从问题的某一个初始解出发一步一步地进行，根据某个优化测度，每一步都要确保能获得局部最优解。每一步只考虑一个数据，他的选取应该满足局部优化的条件。若下一个数据和部分最优解连在一起不再是可行解时，就不把该数据添加到部分解中，直到把所有数据枚举完，或者不能再添加算法停止。
function MinCoinChange1(coins, amount) {
  let total = 0,
    change = [];
  for (let i = coins.length; i >= 0; i--) {
    let coin = coins[i];
    while (total + coin <= amount) {
      change.push(coin);
      total += coin;
    }
  }
  return change;
}

const amount = 37;
console.log(MinCoinChange1([1, 5, 10, 25], amount)); // [ 25, 10, 1, 1 ]
console.log(MinCoinChange1([25, 1, 5, 10], amount)); // [ 10, 10, 10, 5, 1, 1 ]
