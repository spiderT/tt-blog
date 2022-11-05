// function A() {}
// function B() {
//   this.b = "污染 A 的原型";
// }

// A.prototype = new B();
// console.log(A.prototype.__proto__ === B.prototype); // => true
// const a = new A();
// const b = new B();
// console.log(a instanceof A); // => true
// console.log(a instanceof B); // => true
// console.log(b instanceof B); // => true
// console.log(A.prototype.constructor); // => [Function: B]



// 这种方式会导致 B 的实例属性污染 A 的原型。解决办法就是通过一个空的函数桥接一下，空的函数总不会有实例属性污染原型链
function A(p) {
  this.p = p;
}

function B() {
  this.b = "污染原型";
}

// 空函数
function Empty() {}

Empty.prototype = B.prototype;
A.prototype = new Empty();
// 修正 constructor 指向
A.prototype.constructor = A;

// 满足原型继承的定义
console.log(A.prototype.__proto__ === B.prototype); // => true

const a = new A("p");
console.log(a instanceof A); // => true

const b = new B();
console.log(b instanceof B); // => true

// a 也是 B 的实例
console.log(a instanceof B); // => true
console.log(a.__proto__.__proto__ === B.prototype); // => true
console.log(A.prototype.constructor); // => [Function: A]
