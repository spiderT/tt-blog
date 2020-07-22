// var proxy = new Proxy({}, {
//   get: function(target, property) {
//     return 35;
//   }
// });

// proxy.time // 35
// proxy.name // 35
// proxy.title // 35



var handler = {
  get: function(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

console.log('fproxy(1, 2)', fproxy(1, 2)) // 1
console.log('new fproxy(1, 2)', new fproxy(1, 2)) // {value: 2}
fproxy.prototype === Object.prototype // true
// fproxy.foo === "Hello, foo" // true
console.log('fproxy.foo ', fproxy.foo ); // Hello, foo