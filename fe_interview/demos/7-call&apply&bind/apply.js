Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  context.fn = this;
  let result;
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

const arr = [1, 3, 4, 2];
const max = Math.max.apply(this, arr);
console.log(max); // 4

const myMax = Math.max.myApply(this, arr);
console.log(myMax); // 4
