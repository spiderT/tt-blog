// // 简单版本  如果对象的属性循环嵌套，容易溢出  Maximum call stack size exceeded
// function deepClone(source) {
//   let clone =
//     source.constructor === Array
//       ? Object.assign([], source)
//       : Object.assign({}, source);
//   Object.keys(clone).forEach(
//     (key) =>
//       (clone[key] =
//         typeof source[key] === "object" ? deepClone(source[key]) : source[key])
//   );
//   return clone;
// }

// https://blog.csdn.net/qq_41846861/article/details/102296436
function isObject(obj) {
  return typeof obj === "object" && obj != null;
}

function deepClone(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表

  const target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 新增代码，哈希表设值

  // start  拷贝symbol
  // let symKeys = Object.getOwnPropertySymbols(source); // 查找
  // if (symKeys.length) {
  //   // 查找成功
  //   symKeys.forEach((symKey) => {
  //     if (isObject(source[symKey])) {
  //       target[symKey] = deepClone(source[symKey], hash);
  //     } else {
  //       target[symKey] = source[symKey];
  //     }
  //   });
  // }
  // end  拷贝symbol

  //   for (let key in source) {
  //     if (Object.prototype.hasOwnProperty.call(source, key)) {
  //       if (isObject(source[key])) {
  //         target[key] = deepClone(source[key], hash); // 新增代码，传入哈希表
  //       } else {
  //         target[key] = source[key];
  //       }
  //     }
  //   }

  const keys = Reflect.ownKeys(source);
  if (keys.length) {
    // 查找成功
    keys.forEach((symKey) => {
      if (isObject(source[symKey])) {
        target[symKey] = deepClone(source[symKey], hash);
      } else {
        target[symKey] = source[symKey];
      }
    });
  }

  return target;
}

const obj = {
  a: {
    name: "a",
  },
  b: {
    name: "b",
  },
  c: new Date(),
  d: { [Symbol("d")]: "hello" },
  reg: /\w*$/,
  f: [1, [2, 3]],
};

const result = deepClone(obj);
result.f = [0];
result.a.name = "cc";
console.log(result);
console.log(obj);
