function minCoinChange(coins, amount) {
  let result = null;
  if (!amount) return result;

  const makeChange = (index, value, min) => {
      // todo
    console.log(index, value, min);
    let coin = coins[index];
    let newAmount = Math.floor(value / coin);
    if (newAmount) min[coin] = newAmount;
    if (value % coin !== 0) {
      makeChange(--index, value - coin * newAmount, min);
    }
  };

  const arr = [];
  for (let i = 0; i < coins.length; i++) {
    const cache = {};
    makeChange(i, amount, cache);
    arr.push(cache);
  }

//   console.log(arr);
  let newMin = 0;
  arr.forEach((item) => {
    let min = 0;
    for (let v in item) min += item[v];
    if (!newMin || min < newMin) {
      newMin = min;
      result = item;
    }
  });
  return result;
}

const coins = [1, 5, 10, 25];
const amount = 37;
// minCoinChange(coins, amount);
console.log(minCoinChange(coins, amount));

// // 硬币找零算法
// function MinCoinChange(coins, amount) {
//   let cache = {};

//   const makeChange = function (amount) {
//     console.log('cache', cache);
//     if (!amount) {
//       return [];
//     }
//     if (cache[amount]) {
//       return cache[amount];
//     }
//     let min = [],
//       restMin,
//       restAmount;
//     for (let i = 0, len = coins.length; i < len; i++) {
//       let coin = coins[i];
//       restAmount = amount - coin;
//       if (restAmount >= 0) {
//         restMin = makeChange(restAmount);
//       }


//       if (
//         restAmount >= 0 &&
//         (restMin.length < min.length - 1 || !min.length) &&
//         (restMin.length || !restAmount)
//       ) {
//         min = [coin].concat(restMin);
//       }
//     }
//     // console.log("min", min);
//     return (cache[amount] = min);
//   };

//   makeChange(amount);
// }

// const min = MinCoinChange(coins, amount);

// console.log("min", min);
