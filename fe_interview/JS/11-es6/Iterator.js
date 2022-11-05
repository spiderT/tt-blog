// 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
// Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

// 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
// 下面是一个模拟next方法返回值的例子。
var it = makeIterator(["a", "b"]);

it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}

// 2
// ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

// 原生具备 Iterator 接口的数据结构如下。
// • Array
// • Map
// • Set
// • String
// • TypedArray
// • 函数的 arguments 对象
// • NodeList 对象

// 对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。
// 一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
// class RangeIterator {
//   constructor(start, stop) {
//     this.value = start;
//     this.stop = stop;
//   }

//   [Symbol.iterator]() {
//     return this;
//   }

//   next() {
//     var value = this.value;
//     if (value < this.stop) {
//       this.value++;
//       return { done: false, value: value };
//     }
//     return { done: true, value: undefined };
//   }
// }

// function range(start, stop) {
//   return new RangeIterator(start, stop);
// }

// for (var value of range(0, 3)) {
//   console.log(value); // 0, 1, 2
// }



// 3. 调用 Iterator 接口的场合
// 解构赋值
// 扩展运算符
// yield*
// for...of
// Array.from()
// Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
// Promise.all()
// Promise.race()



// 4. 字符串的 Iterator 接口， 字符串是一个类似数组的对象，也原生具有 Iterator 接口。
// var someString = "hi";
// typeof someString[Symbol.iterator]
// // "function"

// var iterator = someString[Symbol.iterator]();

// console.log(iterator.next())  // { value: "h", done: false }
// console.log(iterator.next())  // { value: "i", done: false }
// console.log(iterator.next())  // { value: undefined, done: true }


// 5. 遍历器对象的 return()，throw()
// 自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。



// 6.for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。
// var arr = ['a', 'b', 'c', 'd'];

// for (let a in arr) {
//   console.log(a); // 0 1 2 3
// }

// for (let a of arr) {
//   console.log(a); // a b c d
// }


// for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。
// let arr = [3, 5, 7];
// arr.foo = 'hello';

// for (let i in arr) {
//   console.log(i); // "0", "1", "2", "foo"
// }

// for (let i of arr) {
//   console.log(i); //  "3", "5", "7"
// }










