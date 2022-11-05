// 数值的整数次方
function Power(base, exponent) {
  if (base == 0) return 0;
  if (exponent == 0) return 1;
  var ans = 1;
  if (exponent < 0) {
    base = 1 / base;
    exponent = -exponent;
  }
  for (var i = 1; i <= exponent; i++) {
    ans = ans * base;
  }
  return ans;
}

console.log(Power(3, 4));
