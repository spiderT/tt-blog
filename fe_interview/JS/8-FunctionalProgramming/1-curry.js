var curry = (fn) => {
  return (judge = (...args) => {
    // fn.length 属性指明函数的 形参 个数
    debugger;
    return args.length === fn.length
      ? fn(...args)
      : (arg) => judge(...args, arg);
  });
};

var fn = curry(function (a, b, c) {
  return [a, b, c];
});

// const result1 = fn("a", "b", "c");
// const result2 = fn("a", "b")("c");
const result3 = fn("a")("b")("c");

console.log("result3", result3); // [ 'a', 'b', 'c' ]
