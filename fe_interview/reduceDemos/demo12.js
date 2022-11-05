function Fibonacci(len = 2) {
  const arr = [...new Array(len).keys()];
  return arr.reduce((t, v, i) => (i > 1 && t.push(t[i - 1] + t[i - 2]), t), [
    0,
    1,
  ]);
}

console.log(Fibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
