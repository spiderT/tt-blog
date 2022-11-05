function sortVersion(list) {
  // sort 快速排序 O(logn)  https://segmentfault.com/a/1190000010648740
  list.sort((a, b) => getVersionValue(a) - getVersionValue(b));
  return list;
}

// 1.1.1 => 10101 /  1.10.10 => 11010
function getVersionValue(str) {
  const [x, y, z] = str.split(".");
  return x * Math.pow(10, 4) + y * Math.pow(10, 2) + z;
}

const list = ["4.3.17", "4.3.16", "4.3.9"];

console.log(sortVersion(list)); // [ '4.3.9', '4.3.16', '4.3.17' ]
