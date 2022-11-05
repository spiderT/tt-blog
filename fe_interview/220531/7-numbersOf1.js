// 二进制中1的个数
function NumberOf1(n) {
  let ans = 0;
  while (n) {
    ans++;
    n = n & (n - 1); // n&（n-1）可以理解为n中有多少个1变会执行多少次。
    console.log(n)
  }
  return ans;
}

// 111 2+4+8
console.log(NumberOf1(14))
