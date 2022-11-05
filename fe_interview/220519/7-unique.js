// 数组去重 12种
// https://segmentfault.com/a/1190000016418021
const unique = (arr) => {
  const hash = {};
  const result = [];
  arr.map((i) => {
    if (!hash[i]) {
      hash[i] = true;
      result.push(i);
    }
  });

  return result;
};

const unique2 = (arr) =>
  arr.filter((item, index, self) => self.indexOf(item) === index);

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
const unique3 = (arr) =>
  arr.reduce((pre, cur) => (pre.includes(cur) ? pre : [...pre, cur]), []);

// const arr = [1, 8, 9, 4, 5, 6, 7, 2, 1, 2, 5, 8, 3, 4, 6, 7, 2];

// const res = unique3(arr);

// console.log("res", res);
