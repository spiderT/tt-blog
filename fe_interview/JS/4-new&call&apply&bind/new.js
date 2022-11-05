// 1
// function Person() {
//   this.name = "Jack";
// }
// var p = Person();
// console.log(p); // undefined 没有使用   new 这个关键词，返回的结果就是 undefined。
// console.log(name); // Jack   JavaScript 代码在默认情况下 this 的指向是 window，那么 name 的输出结果就为 Jack
// console.log(p.name); // 'name' of undefined

// 2
// 当构造函数最后 return 出来的是一个和 this 无关的对象时，new 命令会直接返回这个新对象，而不是通过 new 执行步骤生成的 this 对象。
// function Person() {
//   this.name = "Jack";
//   return { age: 18 };
// }

// var p = new Person();
// console.log(p); // {age: 18}
// console.log(p.name); // undefined
// console.log(p.age); // 18

// 3
// 当构造函数中 return 的不是一个对象时，那么它还是会根据 new 关键词的执行逻辑，生成一个新的对象（绑定了最新 this），最后返回出来
// function Person() {
//   this.name = "Jack";
//   return "tom";
// }
// var p = new Person();
// console.log(p); // {name: 'Jack'}
// console.log(p.name); // Jack

// 实现 new
// 1. 创建一个新对象；
// 2. 将构造函数的作用域赋给新对象（this 指向新对象）；
// 3. 执行构造函数中的代码（为这个新对象添加属性）；
// 4. 返回新对象。
// new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象。
function _new( fn ){
  const obj = {}
  // 让实例可以访问构造函数原型（constructor.prototype）所在原型链上的属性；
  obj.__proto__ = fn.prototype
  const result = fn.apply(obj, [...arguments].splice(1))
  return typeof result === 'object' ? result : obj
}


// 验证
function Person(name) {
  this.name = name || "Jack";
}
// var p = new Person();
// console.log(p); // {name: 'Jack'}

const p2 = _new(Person);
console.log(p2); // {name: 'Jack'}


function mynew(fn, ){
  const obj = Object.create(fn.prototype); // 新生成一个对象，链接到原型
  const res = fn.apply(obj, [...arguments].slice(1)); // 执行构造函数，绑定this到这个对象上
  return res instanceof Object ? res: obj // 如果返回结果有对象，返回对象

}