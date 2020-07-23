// // 拦截了对于target对象的Object.keys()操作，只返回a、b、c三个属性之中的a属性。
// let target = {
//   a: 1,
//   b: 2,
//   c: 3
// };

// let handler = {
//   ownKeys(target) {
//     return ['a'];
//   }
// };

// let proxy = new Proxy(target, handler);

// Object.keys(proxy)
// // [ 'a' ]



// // 拦截第一个字符为下划线的属性名
// let target = {
//   _bar: 'foo',
//   _prop: 'bar',
//   prop: 'baz'
// };

// let handler = {
//   ownKeys (target) {
//     return Reflect.ownKeys(target).filter(key => key[0] !== '_');
//   }
// };

// let proxy = new Proxy(target, handler);
// for (let key of Object.keys(proxy)) {
//   console.log(target[key]);
// }
// // "baz"

// ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
// • Object.getOwnPropertyNames()
// • Object.getOwnPropertySymbols()
// • Object.keys()
// • for...in循环

let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
};

Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
});

let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
};

let proxy = new Proxy(target, handler);

console.log(Object.keys(proxy))
// ['a']