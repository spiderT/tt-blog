// N 级台阶，一次只能跳 3 级 4 级或者 5 级，请问一种有多少种跳法

function jumpFloor(n) {
  if (n < 3) return 1;
  if (n === 3 || n === 4|| n === 5|| n === 6) return 1;
  // if (n === 4) return 1;
  // if (n === 5) return 1;
  // if (n === 6) return 1;
  if (n === 7) return 2;
  // if (n === 8) return 3;
  // if (n === 9) return 3;
  // if (n === 10) return 4;
  // if (n === 11) return 6;
  return jumpFloor(n - 3) + jumpFloor(n - 4) + jumpFloor(n - 5);
}

// jumpFloor(8) = 1+1+1
// jumpFloor(9) = 1+1+1
// jumpFloor(10) = 2+1+1
// jumpFloor(11) = 3+2+1

console.log(jumpFloor(8)) // 3
console.log(jumpFloor(9)) // 3
console.log(jumpFloor(10)) // 4
console.log(jumpFloor(11)) // 6
console.log(jumpFloor(12)) // 8
