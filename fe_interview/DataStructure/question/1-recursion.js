const finbonacci = (function () {
  const memo = [0, 1];
  const fib = function (n) {
    let result = memo[n];
    if (typeof result !== "number") {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
})();
console.log(finbonacci(100)); //354224848179262000000
