// 将多维数组转化为一维数组。
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
// [1, [2, [3, [4, 5]]], 6]

// let flat = (list) => {
//   const result = [];

//   let fn = function (target, arr) {
//     arr.map((item) => {
//       if (Array.isArray(item)) {
//         fn(target, item);
//       } else {
//         target.push(item);
//       }
//     });
//   };

//   fn(result, list);

//   return result;
// };

const data = [1, [2, [3, [4, 5]]], 6];
// console.log(flat(data));

//使用 Infinity，可展开任意深度的嵌套数组
// console.log(data.flat(Infinity));

// const flatDeep = (arr, d = 1) =>
//   d > 0
//     ? arr.reduce(
//         (pre, val) =>
//           pre.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
//         []
//       )
//     : arr;
// console.log(flatDeep(data, Infinity));

// forEach 遍历数组会自动跳过空元素
// const eachFlat = (arr = [], depth = 1) => {
//   const result = []; // 缓存递归结果
//   (function flat(arr, depth) {
//     arr.forEach((item) => {
//       if (Array.isArray(item) && depth > 0) {
//         flat(item, depth - 1);
//       } else {
//         result.push(item);
//       }
//     });
//   })(arr, depth);
//   return result;
// };

// for of 循环不能去除数组空位，需要手动去除
// const forFlat = (arr = [], depth = 1) => {
//   const result = [];
//   (function flat(arr, depth) {
//     for (let item of arr) {
//       if (Array.isArray(item) && depth > 0) {
//         flat(item, depth - 1);
//       } else {
//         // 去除空元素，添加非undefined元素
//         item !== void 0 && result.push(item);
//       }
//     }
//   })(arr, depth);
//   return result;
// };

// 使用堆栈stack
// function flatten(arr) {
//   const stack = [...arr];
//   const res = [];
//   while (stack.length) {
//     const next = stack.pop();
//     if (Array.isArray(next)) {
//       stack.push(...next);
//     } else {
//       res.push(next);
//     }
//   }
//   // 反转恢复原数组的顺序
//   return res.reverse();
// }

// console.log(flatten(data));

// 递归版本的反嵌套
// function flatten(array) {
//   var flattend = [];
//   (function flat(array) {
//     array.forEach(function (el) {
//       if (Array.isArray(el)) {
//         flat(el);
//       } else {
//         flattend.push(el);
//       }
//     });
//   })(array);
//   return flattend;
// }

// Use Generator function
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*
function flat(array) {
  function* flatten(array) {
    for (const item of array) {
      if (Array.isArray(item)) {
        yield* flatten(item);
      } else {
        yield item;
      }
    }
  }
  return [...flatten(array)];
}

console.log(flat([1, [2, 3], [4, [5, 6], 7], 8]));

// function* anotherGenerator(i) {
//   yield i + 1;
//   yield i + 2;
//   yield i + 3;
// }

// var gen = anotherGenerator(5);
// console.log(gen)
// console.log([...gen])
