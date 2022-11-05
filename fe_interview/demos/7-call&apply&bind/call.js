Function.prototype.myCall = function (context) {
  // this指向调用myCall的对象
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

const arr = [1, 3, 4, 2];
const max = Math.max.call(this, ...arr);
console.log(max); // 4

const myMax = Math.max.myCall(this, ...arr);
console.log(myMax); // 4
