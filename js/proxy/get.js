// var person = {
//   name: "张三"
// };

// var proxy = new Proxy(person, {
//   get: function (target, property) {
//     if (property in target) {
//       return target[property];
//     } else {
//       throw new ReferenceError("Property \"" + property + "\" does not exist.");
//     }
//   }
// });

// proxy.name // "张三"
// proxy.age // 抛出一个错误 ReferenceError: Property "age" does not exist.



// // 实现数组读取负数的索引。数组的位置参数是-1，就会输出数组的倒数第一个成员。
// function createArray(...elements) {
//   let handler = {
//     get(target, propKey, receiver) {
//       let index = Number(propKey);
//       if (index < 0) {
//         propKey = String(target.length + index);
//       }
//       return Reflect.get(target, propKey, receiver);
//     }
//   };

//   let target = [];
//   target.push(...elements);
//   return new Proxy(target, handler);
// }

// let arr = createArray('a', 'b', 'c');
// arr[-1] // c



// // 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
// var pipe = (function () {
//   return function (value) {
//     var funcStack = [];
//     var oproxy = new Proxy({}, {
//       get: function (pipeObject, fnName) {
//         if (fnName === 'get') {
//           return funcStack.reduce(function (val, fn) {
//             return fn(val);
//           }, value);
//         }
//         funcStack.push(window[fnName]);
//         return oproxy;
//       }
//     });

//     return oproxy;
//   }
// }());

// var double = n => n * 2;
// var pow = n => n * n;
// var reverseInt = n => n.toString().split("").reverse().join("") | 0;

// const value = pipe(3).double.pow.reverseInt.get; // 63
// console.log('value', value);


// 如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo // TypeError: Invariant check failed
// TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '123' but got 'abc')


