function add() {
  const a = [...arguments];
  const _add = function (...innerArg) {
    if (innerArg.length === 0) {
      return a.reduce((a, b) => a + b);
    } else {
      a.push(...innerArg)
      return _add;
    }
  };
  return _add;
}

const v = add(1)(2)(3)(); // 6

console.log("v", v);

function sum() {
  const prevSum = [...arguments].reduce((a, b) => a + b);
  const result = function () {
    return sum(...[...arguments, prevSum]);
  };
  result.valueOf = function () {
    return prevSum;
  };
  return result;
}

console.log(sum(1, 2, 3).valueOf()); // 6
console.log(sum(2, 3)(2).valueOf()); // 7
console.log(sum(1)(2)(3)(4).valueOf()); // 10

