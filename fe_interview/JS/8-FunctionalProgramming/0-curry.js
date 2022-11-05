// 第一版
var curry = function (fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  };
};

function add(a, b) {
  return a + b;
}

var addCurry1 = curry(add, 1, 2);
const result1 = addCurry1(); // 3
//或者
var addCurry2 = curry(add, 1);
const result2 = addCurry2(2); // 3
//或者
var addCurry3 = curry(add);
const result3 = addCurry3(1, 2); // 3

console.log('result1', result1)
console.log('result2', result2)
console.log('result3', result3)
