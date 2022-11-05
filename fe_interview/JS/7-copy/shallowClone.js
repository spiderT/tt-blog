function shallowClone(source) {
  const target = {};
  for (let i in source) {
    if (source.hasOwnProperty(i)) {
      target[i] = source[i];
    }
  }
  return target;
}

const a1 = { b: { c: {} } };

// const a2 = shallowClone(a1); // 浅拷贝
// const a3 = {...a1};
// const a4 = Object.assign({}, a1)
// // Object.assign polyfill
// // if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
// //   to[nextKey] = nextSource[nextKey];
// // }

// a4.b.c = 2;
// console.log(a1); // { b: { c: 2 } }

const shallowClone2 = (obj) => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);

const a2 = shallowClone2(a1); // 浅拷贝
a2.b.c = 2;
console.log(a1); // { b: { c: 2 } }

