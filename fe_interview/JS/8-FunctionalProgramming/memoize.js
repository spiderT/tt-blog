const memoize = function (f) {
  const cache = {};

  return function () {
    const arg_str = JSON.stringify(arguments);
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
    return cache[arg_str];
  };
};

const squareNumber = memoize(function (x) {
  const result = x * x;
  return result;
});

squareNumber(4);
//=> 16

squareNumber(4); // 从缓存中读取输入值为 4 的结果
//=> 16


