var pipe = (function () {
  return function (value) {
    var funcStack = [];
    var oproxy = new Proxy(
      {},
      {
        get: function (pipeObject, fnName) {
          if (fnName === "get") {
            return funcStack.reduce(function (val, fn) {
              return fn(val);
            }, value);
          }
          funcStack.push(window[fnName]);
          return oproxy;
        },
      }
    );

    return oproxy;
  };
})();

var double = (n) => n * 2;
var pow = (n) => n * n;
var reverseInt = (n) => n.toString().split("").reverse().join("") | 0;

const result = pipe(3).double.pow.reverseInt.get; // 63
console.log(result);
