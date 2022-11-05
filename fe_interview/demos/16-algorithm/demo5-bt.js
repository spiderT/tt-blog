// 0-1背包
// let maxW = 0;
// /**
//  * @param i 考察到哪个物品了
//  * @param curW 当前已经装进去的物品重量和
//  * @param weight 物品重量数组
//  * @param n  物品个数
//  * @param w  背包可承载重量
//  */
// function knapsack(i, curW, weight, n, w) {
//   if (curW === w || i === n) {
//     if (curW > maxW) {
//       maxW = curW;
//     }
//     return;
//   }
//   knapsack(i + 1, curW, weight, n, w); //选择不装第i个物品
//   if (curW + weight[i] <= w) {
//     knapsack(i + 1, curW + weight[i], weight, n, w); //选择装第i个物品
//   }
// }

// const a = [2, 2, 4, 6, 3];
// knapsack(0, 0, a, 5, 9);
// console.log(maxW);
// // 9

// n皇后
let counter = 0;

function calcQueens(row, result = []) {
  if (row === 8) {
    counter++;
    console.log("第" + counter + "种：");
    printQueens(result);
    console.log("-----------------------");
    return;
  }
  for (let col = 0; col < 8; ++col) {
    if (isOk(row, col, result)) {
      result[row] = col;
      calcQueens(row + 1, result);
    }
  }
}

function isOk(row, col, result) {
  let leftup = col - 1;
  let rightup = col + 1;
  for (let i = row - 1; i >= 0; i--) {
    if (result[i] === col) {
      return false;
    }
    if (leftup >= 0) {
      if (result[i] === leftup) {
        return false;
      }
    }
    if (leftup < 8) {
      if (result[i] === rightup) {
        return false;
      }
    }
    leftup--;
    rightup++;
  }
  return true;
}

function printQueens(arr, counter = 0) {
  counter++;
  for (let row = 0; row < 8; row++) {
    let line = "";
    for (let col = 0; col < 8; col++) {
      if (arr[row] === col) {
        line += " Q ";
      } else {
        line += " * ";
      }
    }
    console.log(line);
  }
  return counter;
}

calcQueens(0);
// 92种摆法
