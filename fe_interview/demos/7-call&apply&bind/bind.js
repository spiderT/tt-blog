// bind后的函数会返回一个函数
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(this + "must be a function");
  }
  // 存储函数本身
  const _this = this;
  // 去除thisArg的其他参数 转成数组
  const args = [...arguments].slice(1);
  // 返回一个函数
  return function F() {
    // 可能返回了一个构造函数，可以 new F()，所以需要判断
    // 原型链对象上的属性不能丢失
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};

const arr = [1, 3, 4, 2];
const max = Math.max.bind(this, ...arr);
console.log(max()); // 4

const myMax = Math.max.myBind(this, ...arr);
console.log(myMax()); // 4
