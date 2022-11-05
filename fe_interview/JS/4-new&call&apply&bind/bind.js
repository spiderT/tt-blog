// 实现 bind 的核心在于返回的时候需要返回一个函数，故这里的 fbound 需要返回，但是在返回的过程中原型链对象上的属性不能丢失。因此这里需要用Object.create 方法，将 this.prototype 上面的属性挂到 fbound 的原型上面，最后再返回 fbound。
Function.prototype.myBind = function (context, ...args) {
  var self = this;
  var fbound = function () {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  if (this.prototype) {
    fbound.prototype = Object.create(this.prototype);
  }

  return fbound;
};

// 创建构造函数Point
function Point(x, y) {
  this.x = x;
  this.y = y;
}

// 为构造函数的原型添加toString方法
Point.prototype.toString = function () {
  return this.x + "," + this.y;
};

const p = new Point(1, 2);
console.log(p.toString()); // '1,2'

const YAxisPoint = Point.myBind(this, 0);
const axisPoint = new YAxisPoint(5);

console.log(axisPoint.toString()); // '0,5'
console.log(axisPoint instanceof Point); // true
console.log(axisPoint instanceof YAxisPoint); // true
